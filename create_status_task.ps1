param(
  [int]$Minutes = 60,
  [string]$TaskName = 'ProjectStatusAutoUpdate'
)

# This script registers a Windows Scheduled Task that runs update_status.ps1 every N minutes.
# Usage: .\create_status_task.ps1 -Minutes 60

$workspace = Split-Path -Parent $MyInvocation.MyCommand.Path
$psPath = Join-Path $workspace 'update_status.ps1'

if (-not (Test-Path $psPath)) {
  Write-Error "update_status.ps1 not found in workspace. Create it first."
  exit 1
}

$taskAction = "powershell.exe -NoProfile -ExecutionPolicy Bypass -File `"$psPath`""

# Use schtasks to create an hourly/minute-based task. If it's already present, overwrite it.
try {
  $cmd = "schtasks /Create /SC MINUTE /MO $Minutes /TN $TaskName /TR `"$taskAction`" /F"
  Write-Host "Creating scheduled task (may require appropriate privileges)..."
  Invoke-Expression $cmd
  Write-Host "Scheduled task '$TaskName' created to run every $Minutes minute(s)."
} catch {
  Write-Error "Failed to create scheduled task: $_"
}

Write-Host "To remove the task manually: schtasks /Delete /TN $TaskName /F"
