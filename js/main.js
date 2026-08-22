// Interactive Logic for Tiare Pérez Concha Portfolio

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initProjectFilters();
    initTerminal();
    initPrintCV();
    initMobileMenu();
    fetchGitHubData();
});

// --- Theme Switcher (Dark/Light) ---
function initTheme() {
    const themeBtns = document.querySelectorAll('.theme-toggle-btn, #theme-toggle');
    const htmlEl = document.documentElement;

    function updateThemeUI(isDark) {
        themeBtns.forEach(btn => {
            if (isDark) {
                btn.innerHTML = `<i class="fa-solid fa-sun text-yellow-400 text-base"></i> <span class="text-xs font-semibold text-slate-200 ml-1">Modo Claro</span>`;
                btn.setAttribute('title', 'Cambiar a Modo Claro (Blanco y Beige)');
            } else {
                btn.innerHTML = `<i class="fa-solid fa-moon text-indigo-500 text-base"></i> <span class="text-xs font-semibold text-slate-800 ml-1">Modo Oscuro</span>`;
                btn.setAttribute('title', 'Cambiar a Modo Oscuro Cyber');
            }
        });
    }

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';

    if (isLight) {
        htmlEl.classList.remove('dark');
        htmlEl.classList.add('light');
        updateThemeUI(false);
    } else {
        htmlEl.classList.add('dark');
        htmlEl.classList.remove('light');
        updateThemeUI(true);
    }

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (htmlEl.classList.contains('dark')) {
                htmlEl.classList.remove('dark');
                htmlEl.classList.add('light');
                localStorage.setItem('theme', 'light');
                updateThemeUI(false);
            } else {
                htmlEl.classList.remove('light');
                htmlEl.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                updateThemeUI(true);
            }
        });
    });
}

// --- Mobile Navigation ---
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// --- Project Filtering ---
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white', 'shadow-lg');
                b.classList.add('bg-slate-800/60', 'text-slate-300', 'hover:bg-slate-700');
            });

            // Add active class to clicked
            btn.classList.add('bg-blue-600', 'text-white', 'shadow-lg');
            btn.classList.remove('bg-slate-800/60', 'text-slate-300', 'hover:bg-slate-700');

            const category = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat.includes(category)) {
                    card.style.display = 'block';
                    card.classList.add('animate-fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// --- Interactive Terminal / CyberShell ---
function initTerminal() {
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const quickCmds = document.querySelectorAll('.terminal-cmd-btn');

    if (!terminalInput || !terminalOutput) return;

    const commands = {
        'help': `Comandos disponibles:
  <span class="text-cyan-400 font-bold">whoami</span>       - Muestra el perfil profesional de Tiare
  <span class="text-cyan-400 font-bold">skills</span>       - Lista las tecnologías principales (Full-Stack & Cyber)
  <span class="text-cyan-400 font-bold">projects</span>     - Lista los proyectos técnicos destacados y activos
  <span class="text-cyan-400 font-bold">pentest</span>      - Simulación interactiva de Pentest 5 Fases
  <span class="text-cyan-400 font-bold">contact</span>      - Muestra los datos de contacto directo
  <span class="text-cyan-400 font-bold">clear</span>        - Limpia la pantalla de la terminal`,

        'whoami': `<span class="text-emerald-400 font-bold">Tiare Pérez Concha</span>
--------------------------------------------------
Role: Analista Programadora & Estudiante Ing. en Informática
Práctica Profesional: Advance Ingeniería (Finalizada 2026)
Proyectos Activos: Conpi & Capp (Comparadora de Precios)
Stack: React, Node.js, PostgreSQL, Kotlin, Supabase, Spring Boot
Location: Puente Alto, RM, Chile
Status: <span class="text-green-400">Disponible para oportunidades profesionales</span>`,

        'skills': `<span class="text-yellow-400 font-bold">[+] HARD SKILLS & TECH STACK</span>
--------------------------------------------------
• <span class="text-blue-400">Frontend:</span> React, JavaScript, Jetpack Compose (Kotlin), Bootstrap, HTML5/CSS3
• <span class="text-emerald-400">Backend & DB:</span> Node.js, PostgreSQL, Spring Boot, REST APIs, SQL, Supabase, Firebase
• <span class="text-purple-400">DevOps & Cloud:</span> AWS (VPC, EC2), Docker, Git, GitHub, VS Code
• <span class="text-red-400">Cybersecurity:</span> Pentesting, Kali Linux, Metasploit, OpenVAS
• <span class="text-indigo-400">AI Tools:</span> Claude, Copilot, ChatGPT
• <span class="text-pink-400">CRM & Platforms:</span> Inconcert, Geovictoria, Siebel, Genesys`,

        'projects': `<span class="text-purple-400 font-bold">[+] PROYECTOS TÉCNICOS & ACTIVOS</span>
--------------------------------------------------
1. <span class="text-amber-400 font-bold">Conpi</span> [Plataforma Web - En Desarrollo Actual 2026]
   - Plataforma web responsiva e interactiva.
2. <span class="text-cyan-400 font-bold">Capp</span> [Comparadora de Precios - En Desarrollo Actual 2026]
   - Aplicación web comparadora de precios para ofertas y cotizaciones.
3. <span class="text-emerald-400 font-bold">Cesta Orgánica</span> [Android App Native - Kotlin + Supabase]
   - Migración de Firebase a Supabase, arquitectura móvil moderna.
4. <span class="text-blue-400 font-bold">Libro de Clases Digital</span> [Microservicios - Spring Boot]
   - Arquitectura distribuida con Eureka & RabbitMQ.
5. <span class="text-red-400 font-bold">Evaluación de Penetración Integral</span> [Pentesting 5 Fases]
   - Auditoría de seguridad con OpenVAS, Metasploit e informe técnico.`,

        'pentest': `<span class="text-red-500 font-bold">[!] INICIANDO SIMULACIÓN DE PENTEST EN ENTORNO SIMULADO...</span>
<span class="text-slate-400">[1/5] Fase 1: Reconocimiento pasivo/activo completado.</span>
<span class="text-slate-400">[2/5] Fase 2: Escaneo de vulnerabilidades con OpenVAS...</span>
<span class="text-cyan-400">    -> Puertos abiertos: 80/tcp (HTTP), 443/tcp (HTTPS), 5432/tcp (PostgreSQL)</span>
<span class="text-slate-400">[3/5] Fase 3: Explotación controlada con Metasploit Framework...</span>
<span class="text-emerald-400">    -> Exploit ejecutado con éxito en entorno de prueba. Access Granted.</span>
<span class="text-slate-400">[4/5] Fase 4: Post-Explotación y Análisis de impacto.</span>
<span class="text-slate-400">[5/5] Fase 5: Elaboración de Informe Técnico de Remediación.</span>
<span class="text-green-400 font-bold">[✓] PENTEST COMPLETADO CON ÉXITO. Sistema asegurado y documentado.</span>`,

        'contact': `<span class="text-cyan-400 font-bold">[+] DATOS DE CONTACTO</span>
--------------------------------------------------
• Email: <a href="mailto:tiare.perezconcha@gmail.com" class="underline text-blue-400">tiare.perezconcha@gmail.com</a>
• Teléfono: <a href="tel:+56950011319" class="underline text-blue-400">+56 9 5001 1319</a>
• Ubicación: Puente Alto, RM, Chile
• LinkedIn / GitHub: Disponibles en la barra superior`
    };

    function appendOutput(cmd, response) {
        const line = document.createElement('div');
        line.className = 'mb-3';
        line.innerHTML = `
            <div class="flex items-center space-x-2 text-slate-400 text-sm mb-1">
                <span class="text-emerald-400">tiare@cyber-sec</span>:<span class="text-blue-400">~</span>$ <span class="text-white font-semibold">${escapeHtml(cmd)}</span>
            </div>
            <div class="text-slate-300 text-sm pl-4 leading-relaxed">${response}</div>
        `;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.value.trim().toLowerCase();
            terminalInput.value = '';

            if (cmd === '') return;

            if (cmd === 'clear') {
                terminalOutput.innerHTML = '';
                return;
            }

            if (commands[cmd]) {
                appendOutput(cmd, commands[cmd]);
            } else {
                appendOutput(cmd, `<span class="text-red-400">Comando no reconocido: '${escapeHtml(cmd)}'. Escribe '<span class="text-yellow-300">help</span>' para ver los comandos disponibles.</span>`);
            }
        }
    });

    quickCmds.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd === 'clear') {
                terminalOutput.innerHTML = '';
            } else if (commands[cmd]) {
                appendOutput(cmd, commands[cmd]);
            }
        });
    });
}

// Helper to escape HTML in terminal
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// --- Print / PDF Download Helper ---
function initPrintCV() {
    // PDF links execute native direct file download
}

// --- Fetch GitHub API Data ---
function fetchGitHubData() {
    const githubUsername = 'tiare-perez'; // Default fallback
    const repoContainer = document.getElementById('github-stats-container');

    if (!repoContainer) return;

    fetch(`https://api.github.com/users/${githubUsername}`)
        .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
        })
        .then(data => {
            document.getElementById('gh-repos-count').textContent = data.public_repos || '6+';
            document.getElementById('gh-followers-count').textContent = data.followers || '10+';
        })
        .catch(err => {
            console.log('GitHub API info: Using optimized static metrics.');
        });
}
