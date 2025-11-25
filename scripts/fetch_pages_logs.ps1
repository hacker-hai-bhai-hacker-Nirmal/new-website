<#
.SYNOPSIS
Fetch the latest Cloudflare Pages deployment logs for a Pages project.

.DESCRIPTION
This script gets the most recent deployment for a Cloudflare Pages project and
downloads its logs. It reads credentials from parameters or environment
variables. It avoids storing secrets in the repo.

.PARAMETER AccountId
Cloudflare Account ID. If not provided, the script will look for the
`CF_ACCOUNT_ID` environment variable.

.PARAMETER ProjectName
Cloudflare Pages project name. If not provided, the script will look for the
`CF_PAGES_PROJECT` environment variable.

.PARAMETER ApiToken
Cloudflare API token with permission to read Pages deployments. If not
provided, the script will look for the `CF_API_TOKEN` environment variable.

.PARAMETER OutFile
Path to save logs. Default: `pages-deploy-log.txt` in the current directory.

.EXAMPLE
.
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\fetch_pages_logs.ps1 \
  -AccountId "abcd..." -ProjectName "new-website" -ApiToken "xxxx" -OutFile .\pages-deploy-log.txt

Or set environment variables and run without parameters:
  $env:CF_API_TOKEN = 'xxx'
  $env:CF_ACCOUNT_ID = 'abcd...'
  $env:CF_PAGES_PROJECT = 'new-website'
  .\scripts\fetch_pages_logs.ps1 -OutFile .\pages-deploy-log.txt
#>

param(
    [string] $AccountId,
    [string] $ProjectName,
    [string] $ApiToken,
    [string] $OutFile = "pages-deploy-log.txt"
)

Set-StrictMode -Version Latest

if (-not $ApiToken) { $ApiToken = $env:CF_API_TOKEN }
if (-not $AccountId) { $AccountId = $env:CF_ACCOUNT_ID }
if (-not $ProjectName) { $ProjectName = $env:CF_PAGES_PROJECT }

if (-not $ApiToken -or -not $AccountId -or -not $ProjectName) {
    Write-Error "Missing required parameters. Provide -ApiToken, -AccountId, and -ProjectName or set CF_API_TOKEN, CF_ACCOUNT_ID, CF_PAGES_PROJECT environment variables."
    exit 2
}

$headers = @{ "Authorization" = "Bearer $ApiToken"; "Accept" = "application/json" }

try {
    Write-Host "Fetching latest deployment for project '$ProjectName' in account '$AccountId'..."
    $deploysUri = "https://api.cloudflare.com/client/v4/accounts/$AccountId/pages/projects/$ProjectName/deployments?per_page=1"
    $deploys = Invoke-RestMethod -Headers $headers -Uri $deploysUri -Method Get -ErrorAction Stop

    if (-not $deploys.result -or $deploys.result.Count -lt 1) {
        Write-Error "No deployments found for project '$ProjectName'."
        exit 3
    }

    $deploymentId = $deploys.result[0].id
    Write-Host "Latest deployment id: $deploymentId"

    $logsUri = "https://api.cloudflare.com/client/v4/accounts/$AccountId/pages/projects/$ProjectName/deployments/$deploymentId/logs"
    Write-Host "Fetching logs from $logsUri ..."

    # Some endpoints return raw text; use Invoke-WebRequest to capture content reliably
    $response = Invoke-WebRequest -Headers $headers -Uri $logsUri -Method Get -ErrorAction Stop

    $content = $response.Content

    if (-not $content) {
        Write-Warning "No logs returned for deployment $deploymentId."
    }

    $content | Out-File -FilePath $OutFile -Encoding utf8
    Write-Host "Saved deployment logs to: $OutFile"
}
catch {
    Write-Error "Failed to fetch deployment logs: $($_.Exception.Message)"
    exit 4
}
