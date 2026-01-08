# Figma to JSON Extraction Script
# Usage: .\run-figma-to-json.ps1 "https://figma.com/design/..."

param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$FigmaUrl
)

# Display info
Write-Host ""
Write-Host "Mode: Design JSON Extraction" -ForegroundColor Cyan
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
$logPath = "$PWD\log_figma_to_json_$timestamp.jsonl"

# Build slash command
$slashCommand = "/figma-to-json $FigmaUrl"

# Display info
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Figma Design to JSON Extraction" -ForegroundColor Cyan
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

# Find created project directory (pattern: *_YYMMDD_HHMM_design)
$projectDir = Get-ChildItem -Directory | Where-Object {
    $_.Name -match '_\d{6}_\d{4}_design$' -and $_.LastWriteTime -gt (Get-Date).AddMinutes(-30)
} | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if ($projectDir) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Magenta
    Write-Host "Project found: $($projectDir.Name)" -ForegroundColor Magenta
    Write-Host "========================================" -ForegroundColor Magenta

    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Design JSON files created successfully!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green

    # Show project contents
    Write-Host ""
    Write-Host "Generated files:" -ForegroundColor Yellow
    Write-Host "  - design.json" -ForegroundColor Gray
    Write-Host "  - design-tokens.json" -ForegroundColor Gray
    Write-Host "  - generate-css-variables.js" -ForegroundColor Gray
    Write-Host "  - generate-tailwind-config.js" -ForegroundColor Gray
    Write-Host "  - README.md" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  cd $($projectDir.Name)" -ForegroundColor Cyan
    Write-Host "  node generate-css-variables.js > variables.css" -ForegroundColor Cyan
    Write-Host "  node generate-tailwind-config.js > tailwind-theme.js" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "No new project directory found" -ForegroundColor Yellow
    Write-Host "Please check the log file for errors: $logPath" -ForegroundColor Gray
}

