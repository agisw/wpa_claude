# Claude Code Execution Script (Hybrid Mode)
# Usage: .\run-claude.ps1 -FigmaUrl "https://figma.com/..." -Framework React
#        .\run-claude.ps1 "https://figma.com/..." React

param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$FigmaUrl,

    [Parameter(Mandatory=$true, Position=1)]
    [ValidateSet("React", "Vue", IgnoreCase=$true)]
    [string]$Framework
)

# Normalize framework name
$Framework = $Framework.ToLower()

# Display selected framework
Write-Host ""
Write-Host "Framework: $($Framework.Substring(0,1).ToUpper() + $Framework.Substring(1))" -ForegroundColor Cyan
Write-Host "Figma URL: $FigmaUrl" -ForegroundColor Cyan

# Check Figma MCP configuration
Write-Host ""
Write-Host "Checking Figma MCP configuration..." -ForegroundColor Gray
$mcpList = claude mcp list 2>&1

if ($mcpList -match "figma") {
    Write-Host "Figma MCP: OK" -ForegroundColor Green
} else {
    Write-Host "Figma MCP not found. Installing..." -ForegroundColor Yellow
    claude mcp add --transport http figma https://mcp.figma.com/mcp
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Figma MCP: Installed" -ForegroundColor Green
    } else {
        Write-Host "Failed to install Figma MCP" -ForegroundColor Red
        exit 1
    }
}

# Timestamp
$timestamp = Get-Date -Format 'yyMMdd_HHmm'

# Log file path
$logPath = "$PWD\log_$timestamp.jsonl"

# Build slash command
$slashCommand = "/figma-$Framework $FigmaUrl"

# Display info
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Claude Code Execution for Web Publishing..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Command: $slashCommand" -ForegroundColor Yellow
Write-Host "Log file: $logPath" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

# Run Claude with slash command
claude --output-format stream-json --verbose $slashCommand > $logPath

# Done
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Done! Log saved: $logPath" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Check for errors in log
$errorCount = (Get-Content $logPath -Encoding Unicode | Select-String '"is_error":true').Count
if ($errorCount -gt 0) {
    Write-Host ""
    Write-Host "Warning: $errorCount error(s) found in log" -ForegroundColor Red
}

# Find created project directory (pattern: *_YYMMDD_HHMM)
$projectDir = Get-ChildItem -Directory | Where-Object {
    $_.Name -match '_\d{6}_\d{4}$' -and $_.LastWriteTime -gt (Get-Date).AddMinutes(-30)
} | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if ($projectDir) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Magenta
    Write-Host "Project found: $($projectDir.Name)" -ForegroundColor Magenta
    Write-Host "========================================" -ForegroundColor Magenta

    # Ask user if they want to run dev server
    $response = Read-Host "Run 'npm run dev'? (Y/n)"

    if ($response -eq '' -or $response -match '^[Yy]') {
        Write-Host ""
        Write-Host "Starting dev server..." -ForegroundColor Cyan
        Set-Location $projectDir.FullName
        npm run dev
    } else {
        Write-Host ""
        Write-Host "To start manually:" -ForegroundColor Yellow
        Write-Host "  cd $($projectDir.Name)" -ForegroundColor Yellow
        Write-Host "  npm run dev" -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "No new project directory found" -ForegroundColor Yellow
}
