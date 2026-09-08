# 🛡️ Centro de Respaldos (Backup Center) — Portfolio Tiare Pérez

Este centro de respaldos permite crear y restaurar copias de seguridad de forma fácil y segura antes de hacer futuras actualizaciones o cambios en la página web.

---

## 🚀 1. Cómo crear un Respaldo Automático (1-Click)

En tu terminal de PowerShell dentro de la carpeta del proyecto, ejecuta:

```powershell
.\backups\crear_respaldo.ps1
```

### ¿Qué hace este script?
1. Genera un archivo comprimido `.zip` en la carpeta `backups/` etiquetado con la fecha y hora exacta (ej. `respaldo_portfolio_2026-09-08_00-50-00.zip`).
2. Guarda el código HTML, CSS, JavaScript y assets completos.
3. Crea y sube automáticamente una etiqueta (**Git Tag**) de respaldo a tu repositorio de GitHub para poder volver a este punto en la nube en cualquier momento.

---

## 🔄 2. Cómo Restaurar un Respaldo Anterior

Si hiciste un cambio que rompió el sitio o quieres volver a una versión previa, ejecuta:

```powershell
.\backups\restaurar_respaldo.ps1 -ArchivoZip .\backups\respaldo_portfolio_AÑO-MES-DIA.zip
```

---

## ☁️ 3. Restaurar desde GitHub (Remoto)

También puedes volver al punto de restauración estable en GitHub usando Git:

```bash
git checkout backup-estabilidad-2026
```
