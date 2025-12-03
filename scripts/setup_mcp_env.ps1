<#
.SYNOPSIS
Configure MCP server environment variables for GitHub and Cloudflare integration

.DESCRIPTION
This script helps set up the required environment variables for MCP servers.
It can save variables to your PowerShell profile for persistence.

.PARAMETER Save
If specified, saves the variables to your PowerShell profile for future sessions

.EXAMPLE
.\setup_mcp_env.ps1
# Interactive setup - sets variables for current session only

.EXAMPLE
.\setup_mcp_env.ps1 -Save
# Interactive setup - saves to PowerShell profile for persistence
#>

param(
    [switch]$Save
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "=== MCP Server Environment Setup ===" -ForegroundColor Cyan
Write-Host ""

# GitHub Token
Write-Host "GitHub Personal Access Token:" -ForegroundColor Yellow
Write-Host "  Required scopes: repo, workflow, read:org" -ForegroundColor Gray
Write-Host "  Create at: https://github.com/settings/tokens" -ForegroundColor Gray
$githubToken = Read-Host "Enter your GitHub token (or press Enter to skip)"

# Cloudflare API Token
Write-Host ""
Write-Host "Cloudflare API Token:" -ForegroundColor Yellow
Write-Host "  Required permissions: Pages:Read, Pages:Edit, DNS:Read, DNS:Edit" -ForegroundColor Gray
Write-Host "  Create at: https://dash.cloudflare.com/profile/api-tokens" -ForegroundColor Gray
$cfToken = Read-Host "Enter your Cloudflare API token (or press Enter to skip)"

# Cloudflare Account ID
Write-Host ""
Write-Host "Cloudflare Account ID:" -ForegroundColor Yellow
Write-Host "  Find in: Cloudflare Dashboard > Account Home (right sidebar)" -ForegroundColor Gray
$cfAccountId = Read-Host "Enter your Cloudflare Account ID (default: 2b0bdc88f0335d3e29ffb6ce68841a0e)"
if ([string]::IsNullOrWhiteSpace($cfAccountId)) {
    $cfAccountId = "2b0bdc88f0335d3e29ffb6ce68841a0e"
}

Write-Host ""
Write-Host "Setting environment variables..." -ForegroundColor Green

# Set for current session
if (![string]::IsNullOrWhiteSpace($githubToken)) {
    $env:GITHUB_TOKEN = $githubToken
    Write-Host "✓ GITHUB_TOKEN set" -ForegroundColor Green
}

if (![string]::IsNullOrWhiteSpace($cfToken)) {
    $env:CF_API_TOKEN = $cfToken
    $env:CLOUDFLARE_API_TOKEN = $cfToken
    Write-Host "✓ CF_API_TOKEN and CLOUDFLARE_API_TOKEN set" -ForegroundColor Green
}

if (![string]::IsNullOrWhiteSpace($cfAccountId)) {
    $env:CF_ACCOUNT_ID = $cfAccountId
    $env:CLOUDFLARE_ACCOUNT_ID = $cfAccountId
    Write-Host "✓ CF_ACCOUNT_ID and CLOUDFLARE_ACCOUNT_ID set" -ForegroundColor Green
}

# Save to profile if requested
if ($Save) {
    Write-Host ""
    Write-Host "Saving to PowerShell profile..." -ForegroundColor Yellow
    
    $profilePath = $PROFILE.CurrentUserAllHosts
    $profileDir = Split-Path -Parent $profilePath
    
    if (!(Test-Path $profileDir)) {
        New-Item -ItemType Directory -Path $profileDir -Force | Out-Null
    }
    
    $envCommands = @"

# MCP Server Environment Variables (added by setup_mcp_env.ps1)
# Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
"@
    
    if (![string]::IsNullOrWhiteSpace($githubToken)) {
        $envCommands += "`n`$env:GITHUB_TOKEN = '$githubToken'"
    }
    
    if (![string]::IsNullOrWhiteSpace($cfToken)) {
        $envCommands += "`n`$env:CF_API_TOKEN = '$cfToken'"
        $envCommands += "`n`$env:CLOUDFLARE_API_TOKEN = '$cfToken'"
    }
    
    if (![string]::IsNullOrWhiteSpace($cfAccountId)) {
        $envCommands += "`n`$env:CF_ACCOUNT_ID = '$cfAccountId'"
        $envCommands += "`n`$env:CLOUDFLARE_ACCOUNT_ID = '$cfAccountId'"
    }
    
    Add-Content -Path $profilePath -Value $envCommands
    Write-Host "✓ Saved to: $profilePath" -ForegroundColor Green
    Write-Host "  (Restart PowerShell or run: . `$PROFILE to load)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "MCP servers are now configured!" -ForegroundColor Green
Write-Host "Restart VS Code to activate the MCP connections." -ForegroundColor Yellow
Write-Host ""
Write-Host "Verify configuration:" -ForegroundColor Cyan
Write-Host "  Get-Content .vscode\mcp-settings.json" -ForegroundColor Gray
Write-Host ""
Write-Host "Test MCP servers:" -ForegroundColor Cyan
Write-Host "  npx @ama-mcp/github --help" -ForegroundColor Gray
Write-Host "  npx @thelord/mcp-cloudflare --help" -ForegroundColor Gray
