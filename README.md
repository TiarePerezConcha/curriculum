# 🚀 Página Web & Portfolio Interactivo — Tiare Pérez Concha

Este repositorio contiene la página web de currículum vitae y portfolio personal interactivo de **Tiare Pérez Concha** (Analista Programadora & Estudiante de Ingeniería en Informática), desarrollada con HTML5, Tailwind CSS, JavaScript moderno y optimizada para **GitHub Pages** (costo $0).

---

## 🌟 Características Destacadas para Reclutadores

- **CyberShell (Terminal Interactivo CLI)**: Permite a los reclutadores y líderes técnicos interactuar con el perfil mediante comandos (`whoami`, `skills`, `projects`, `pentest`, `contact`).
- **Exportador a PDF Integrado**: Generador de CV ejecutivo de 1-2 páginas al presionar el botón "Descargar CV".
- **Filtro de Proyectos**: Permite filtrar proyectos por *Mobile (Kotlin)*, *Microservicios (Spring Boot)*, *Pentesting (Metasploit/OpenVAS)* y *Cloud (AWS/Docker)*.
- **Formulario de Contacto en Tiempo Real**: Integrado con Web3Forms / Formspree para recibir correos a `tiare.perezconcha@gmail.com` sin servidor propio.
- **Dark/Light Mode**: Selector de tema visual fluido.
- **Diseño Ultra-Responsivo**: Adaptado para celulares, tablets y escritorios.

---

## 🛠️ Cómo Publicar en GitHub Pages (Paso a Paso)

Para subir esta página a internet totalmente gratis a través de **GitHub Pages**, sigue estos simples pasos:

### 1. Inicializar Git y subir a GitHub

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
# Inicializar repositorio local (si aún no está iniciado)
git init
git add .
git commit -m "Initial commit - Portfolio Tiare Pérez Concha"

# Conectar con tu repositorio en GitHub
git branch -M main
git remote add origin https://github.com/TU-USUARIO/curriculumpage.git
git push -u origin main
```

*(Reemplaza `TU-USUARIO` por tu nombre de usuario de GitHub).*

---

### 2. Activar GitHub Pages en 1-Click

1. Entra a tu repositorio en GitHub (`https://github.com/TU-USUARIO/curriculumpage`).
2. Haz clic en la pestaña **Settings** (Configuración) en la parte superior.
3. En el menú de la izquierda, selecciona **Pages**.
4. En **Build and deployment** -> **Source**, selecciona **Deploy from a branch**.
5. En **Branch**, elige `main` y la carpeta `/ (root)`.
6. Haz clic en **Save** (Guardar).

¡Listo! En 1-2 minutos tu sitio estará en vivo en:
👉 `https://TU-USUARIO.github.io/curriculumpage/`

---

## 📬 Configuración Opcional del Formulario de Contacto (Web3Forms)

El formulario de contacto utiliza **Web3Forms** (gratuito):
1. Ingresa a [web3forms.com](https://web3forms.com/) y coloca tu email `tiare.perezconcha@gmail.com`.
2. Copia tu `Access Key` que te llegará al correo.
3. Abre `index.html` en la línea del formulario y reemplaza `YOUR_ACCESS_KEY_HERE` por tu clave personal.

---

## 📁 Estructura del Proyecto

```
curriculumpage/
├── index.html        # Estructura principal y contenido del CV
├── css/
│   └── custom.css    # Estilos de terminal, animaciones y reglas de impresión PDF
├── js/
│   └── main.js        # Lógica del terminal CyberShell, filtros y temas
├── assets/
│   └── profile.jpg   # Foto de perfil
└── README.md         # Guía de despliegue y documentación
```
