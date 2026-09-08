# Script de Restauración de Respaldo - Tiare Pérez Portfolio
param(
    [string]$ArchivoZip
)

if (-not $ArchivoZip) {
    Write-Host "Por favor especifica el archivo ZIP de respaldo a restaurar." -ForegroundColor Red
    Write-Host "Ejemplo: .\backups\restaurar_respaldo.ps1 -ArchivoZip .\backups\respaldo_portfolio_2026-09-08_00-50-00.zip" -ForegroundColor Yellow
    exit
}

if (-not (Test-Path $ArchivoZip)) {
    Write-Host "El archivo especificado '$ArchivoZip' no existe." -ForegroundColor Red
    exit
}

Write-Host "Restaurando respaldo desde $ArchivoZip..." -ForegroundColor Cyan
Expand-Archive -Path $ArchivoZip -DestinationPath "." -Force
Write-Host "¡Restauración completada exitosamente!" -ForegroundColor Green
