# Script de Respaldo Automático - Tiare Pérez Portfolio
$fecha = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$destinoDir = "backups\respaldo_$fecha"
$zipArchivo = "backups\respaldo_portfolio_$fecha.zip"

Write-Host "Creando respaldo de seguridad..." -ForegroundColor Cyan

if (-not (Test-Path "backups")) { New-Item -ItemType Directory -Path "backups" | Out-Null }
New-Item -ItemType Directory -Force -Path $destinoDir | Out-Null

Copy-Item "index.html" -Destination $destinoDir -Force
Copy-Item "css" -Destination $destinoDir -Recurse -Force
Copy-Item "js" -Destination $destinoDir -Recurse -Force
Copy-Item "assets" -Destination $destinoDir -Recurse -Force
if (Test-Path "tiare") { Copy-Item "tiare" -Destination $destinoDir -Recurse -Force }

Compress-Archive -Path "$destinoDir\*" -DestinationPath $zipArchivo -Force
Remove-Item -Recurse -Force $destinoDir

Write-Host "¡Respaldo local creado con éxito! Archivo: $zipArchivo" -ForegroundColor Green

# Tag de Git en la nube
try {
    git tag "backup-$fecha"
    git push origin "backup-$fecha"
    Write-Host "Git tag 'backup-$fecha' subida a GitHub exitosamente." -ForegroundColor Green
} catch {
    Write-Host "Respaldo local completado." -ForegroundColor Yellow
}
