param(
  [Parameter(Mandatory=$true)][string]$Note,
  [switch]$Push,
  [switch]$AppendMd
)

<#
Utility: update_memory.ps1
- Adds a note to `.copilot_memory.json` and appends to `COPILOT_MEMORY.md` (optional)
- Commits the changes locally and optionally pushes to the remote
Usage:
  .\update_memory.ps1 -Note "Decided to use static site + serverless functions"
  .\update_memory.ps1 -Note "Added user estimate" -Push -AppendMd
#>

try {
  $workspace = Split-Path -Parent $MyInvocation.MyCommand.Path
} catch {
  Write-Error "Unable to determine script path. Run the script from its folder."
  exit 1
}

$jsonPath = Join-Path $workspace '.copilot_memory.json'
$mdPath = Join-Path $workspace 'COPILOT_MEMORY.md'

# Ensure JSON exists
if (-not (Test-Path $jsonPath)) {
  $base = @{
    metadata = @{
      created_by = 'GitHub Copilot assistant'
      created_at = (Get-Date).ToString('o')
      workspace_path = $workspace
      os = $env:OS
      shell = 'powershell.exe'
    }
    memory_points = @()
    notes = @{
      update_instructions = 'Update this file as project context changes.'
    }
    last_updated = (Get-Date).ToString('o')
  }
  $base | ConvertTo-Json -Depth 20 | Set-Content -Path $jsonPath -Encoding utf8
  if (-not (Test-Path $mdPath)) { "Project Persistent Memory`n" | Out-File -FilePath $mdPath -Encoding utf8 }
}

# Load JSON
$jsonRaw = Get-Content $jsonPath -Raw
$json = $jsonRaw | ConvertFrom-Json

# Build new entry
$existingCount = 0
if ($null -ne $json.memory_points) { $existingCount = ($json.memory_points | Measure-Object).Count }
$nextId = $existingCount + 1
$preview = if ($Note.Length -gt 50) { $Note.Substring(0,50) + '...' } else { $Note }

$newEntry = @{
  id = $nextId
  title = "Note: $preview"
  detail = $Note
  timestamp = (Get-Date).ToString('o')
}

# Append and save
if ($null -eq $json.memory_points) { $json.memory_points = @() }
$json.memory_points += $newEntry
$json.last_updated = (Get-Date).ToString('o')
$json | ConvertTo-Json -Depth 20 | Set-Content -Path $jsonPath -Encoding utf8

# Append to human-readable file if requested (default: append)
if ($AppendMd -or -not (Test-Path $mdPath)) {
  if (-not (Test-Path $mdPath)) { "Project Persistent Memory`n" | Out-File -FilePath $mdPath -Encoding utf8 }
  $line = "- [$(Get-Date -Format s)] $Note"
  Add-Content -Path $mdPath -Value $line
} else {
  # If user did not pass -AppendMd, still append by default to keep human-readable log updated
  $line = "- [$(Get-Date -Format s)] $Note"
  Add-Content -Path $mdPath -Value $line
}

# Git add / commit / push
Push-Location $workspace
try {
  & git add .copilot_memory.json COPILOT_MEMORY.md 2>$null
  $status = & git status --porcelain
  if (-not [string]::IsNullOrWhiteSpace($status)) {
    & git commit -m "Update copilot memory: $preview" 2>$null
    if ($LASTEXITCODE -ne 0) {
      Write-Host "Git commit failed. You may need to set user.name/user.email or review the repo state."
    } else {
      Write-Host "Committed memory update locally."
      if ($Push) {
        & git push
        if ($LASTEXITCODE -ne 0) { Write-Host "Push failed; check remote/auth settings." }
        else { Write-Host "Pushed changes to remote." }
      } else {
        Write-Host "Run with -Push to push to the remote."
      }
    }
  } else {
    Write-Host "No changes to commit. Memory file already up to date."
  }
} catch {
  Write-Host "Git operation failed: $_"
} finally {
  Pop-Location
}

Write-Host "Memory updated: $preview"
