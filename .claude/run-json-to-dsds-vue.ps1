# JSON Design to DSDS Vue Implementation Script
# Usage: .\run-json-to-dsds-vue.ps1 "C:\path\to\design.json"

param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$JsonPath
)

# Display info
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "JSON to DSDS Vue Implementation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "JSON File: $JsonPath" -ForegroundColor Yellow

# Validate JSON file exists
if (-Not (Test-Path $JsonPath)) {
    Write-Host ""
    Write-Host "ERROR: JSON file not found!" -ForegroundColor Red
    Write-Host "Path: $JsonPath" -ForegroundColor Gray
    exit 1
}

Write-Host "JSON File: Exists" -ForegroundColor Green

# Check if JSON is valid
try {
    $jsonContent = Get-Content $JsonPath -Raw | ConvertFrom-Json
    Write-Host "JSON Format: Valid" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "ERROR: Invalid JSON format!" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Gray
    exit 1
}

# Check dsds-core project path
$dsdsCoreRoot = "C:\Users\samsung\Repo\dsds-dev\dsds-core"
$demoVueAppPath = "$dsdsCoreRoot\apps\demo-vue\src\App.vue"

Write-Host ""
Write-Host "Checking DSDS Core project..." -ForegroundColor Gray

if (-Not (Test-Path $dsdsCoreRoot)) {
    Write-Host ""
    Write-Host "ERROR: DSDS Core project not found!" -ForegroundColor Red
    Write-Host "Expected path: $dsdsCoreRoot" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Please ensure dsds-core project exists at the correct location." -ForegroundColor Yellow
    exit 1
}

Write-Host "DSDS Core: Found" -ForegroundColor Green

if (-Not (Test-Path "$dsdsCoreRoot\apps\demo-vue")) {
    Write-Host ""
    Write-Host "ERROR: demo-vue app not found!" -ForegroundColor Red
    Write-Host "Expected path: $dsdsCoreRoot\apps\demo-vue" -ForegroundColor Gray
    exit 1
}

Write-Host "demo-vue App: Found" -ForegroundColor Green

# Timestamp for log file
$timestamp = Get-Date -Format 'yyMMdd_HHmm'

# Log file path
$logPath = "$PWD\log_json_to_dsds_vue_$timestamp.jsonl"

# Build slash command
$slashCommand = "/json-to-dsds-vue `"$JsonPath`""

# Display execution info
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Execution Info" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Command: $slashCommand" -ForegroundColor Yellow
Write-Host "Target: $demoVueAppPath" -ForegroundColor Yellow
Write-Host "Log file: $logPath" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Extract project name from JSON
$projectName = "Unknown Project"
if ($jsonContent.metadata -and $jsonContent.metadata.projectName) {
    $projectName = $jsonContent.metadata.projectName
}

Write-Host "Project Name: $projectName" -ForegroundColor Magenta
Write-Host ""

# Ask for confirmation
Write-Host "This will update the following file:" -ForegroundColor Yellow
Write-Host "  $demoVueAppPath" -ForegroundColor Cyan
Write-Host ""
$confirmation = Read-Host "Continue? (Y/N)"

if ($confirmation -ne 'Y' -and $confirmation -ne 'y') {
    Write-Host ""
    Write-Host "Cancelled by user." -ForegroundColor Yellow
    exit 0
}

# Run Claude with slash command
Write-Host ""
Write-Host "Running Claude AI..." -ForegroundColor Cyan
Write-Host "Please wait..." -ForegroundColor Gray
Write-Host ""

claude --output-format stream-json --verbose $slashCommand > $logPath

# Check exit code
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "ERROR: Claude execution failed!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Check log file: $logPath" -ForegroundColor Gray
    exit 1
}

# Done
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Done! Log saved: $logPath" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Check for errors in log
try {
    $errorCount = (Get-Content $logPath -Encoding Unicode | Select-String '"is_error":true').Count
    if ($errorCount -gt 0) {
        Write-Host ""
        Write-Host "Warning: $errorCount error(s) found in log" -ForegroundColor Red
        Write-Host "Please review the log file for details." -ForegroundColor Yellow
    }
} catch {
    Write-Host ""
    Write-Host "Note: Could not parse log file for errors" -ForegroundColor Yellow
}

# Check if App.vue was modified
if (Test-Path $demoVueAppPath) {
    $lastModified = (Get-Item $demoVueAppPath).LastWriteTime
    $timeAgo = (Get-Date) - $lastModified
    
    if ($timeAgo.TotalMinutes -lt 2) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "App.vue updated successfully!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "Last modified: $($lastModified.ToString('yyyy-MM-dd HH:mm:ss'))" -ForegroundColor Gray
    } else {
        Write-Host ""
        Write-Host "Note: App.vue may not have been updated" -ForegroundColor Yellow
        Write-Host "Last modified: $($lastModified.ToString('yyyy-MM-dd HH:mm:ss'))" -ForegroundColor Gray
    }
}

# Next steps
Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "Next Steps" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "1. Review the updated App.vue file:" -ForegroundColor Yellow
Write-Host "   $demoVueAppPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Start the development server:" -ForegroundColor Yellow
Write-Host "   cd $dsdsCoreRoot" -ForegroundColor Cyan
Write-Host "   pnpm dev:demo-vue" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Open browser:" -ForegroundColor Yellow
Write-Host "   http://localhost:3003/" -ForegroundColor Cyan
Write-Host ""

# Optional: Ask if user wants to start dev server now
Write-Host "========================================" -ForegroundColor Cyan
$startNow = Read-Host "Start dev server now? (Y/N)"

if ($startNow -eq 'Y' -or $startNow -eq 'y') {
    Write-Host ""
    Write-Host "Starting development server..." -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""
    
    Set-Location $dsdsCoreRoot
    pnpm dev:demo-vue
} else {
    Write-Host ""
    Write-Host "Skipping dev server start." -ForegroundColor Gray
    Write-Host "Run 'pnpm dev:demo-vue' manually when ready." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Process completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
