// Main Interactive Logic for Tiare Pérez Concha Portfolio

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initTechCarousel();
    initProjectsCarousel();
    initExpCarousel();
    initTechDetailCard();
});

// --- Tech Carousel Interactive Scroll, Drag & Counter ---
function initTechCarousel() {
    const track = document.getElementById('tech-carousel-track');
    const prevBtn = document.getElementById('tech-prev-btn');
    const nextBtn = document.getElementById('tech-next-btn');
    const counter = document.getElementById('tech-counter');

    if (!track) return;

    const cards = track.querySelectorAll('.tech-carousel-card');
    const totalCards = cards.length;
    const totalCols = Math.ceil(totalCards / 2); // 2 rows

    function getColumnWidth() {
        const card = track.querySelector('.tech-carousel-card');
        if (card) {
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.columnGap) || 16;
            return card.offsetWidth + gap;
        }
        return 260;
    }

    function getTechScrollStep() {
        const colW = getColumnWidth();
        const colsToScroll = window.innerWidth < 640 ? 1 : 2;
        return colW * colsToScroll;
    }

    function updateControls() {
        if (totalCols === 0) return;
        const colW = getColumnWidth();
        const scrollLeft = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;

        let currentCol = Math.min(Math.round(scrollLeft / colW) + 1, totalCols);
        if (scrollLeft >= maxScroll - 10) {
            currentCol = totalCols;
        }

        if (counter) {
            counter.textContent = `${currentCol} / ${totalCols}`;
        }
        if (prevBtn) {
            prevBtn.disabled = scrollLeft <= 10;
        }
        if (nextBtn) {
            nextBtn.disabled = scrollLeft >= maxScroll - 10;
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -getTechScrollStep(), behavior: 'smooth' });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: getTechScrollStep(), behavior: 'smooth' });
        });
    }

    track.addEventListener('scroll', () => {
        requestAnimationFrame(updateControls);
    }, { passive: true });

    // Mouse drag-to-scroll functionality for desktop UX
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
        isDown = false;
    });

    track.addEventListener('mouseup', () => {
        isDown = false;
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;
        track.scrollLeft = scrollLeft - walk;
    });

    updateControls();
    window.addEventListener('resize', updateControls);
}

// --- Experience Carousel Interactive Scroll, Drag & Counter (Max 2 Rows) ---
function initExpCarousel() {
    const track = document.getElementById('exp-carousel-track');
    const prevBtn = document.getElementById('exp-prev-btn');
    const nextBtn = document.getElementById('exp-next-btn');
    const counter = document.getElementById('exp-counter');

    if (!track) return;

    const cards = track.querySelectorAll('.exp-carousel-card');
    const totalCards = cards.length;
    const totalCols = Math.ceil(totalCards / 2); // 2 rows

    function getColumnWidth() {
        const card = track.querySelector('.exp-carousel-card');
        if (card) {
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.columnGap) || 20;
            return card.offsetWidth + gap;
        }
        return track.clientWidth;
    }

    function updateControls() {
        if (totalCols === 0) return;
        const colW = getColumnWidth();
        const scrollLeft = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;

        let currentCol = Math.min(Math.round(scrollLeft / colW) + 1, totalCols);
        if (scrollLeft >= maxScroll - 10) {
            currentCol = totalCols;
        }

        if (counter) {
            counter.textContent = `${currentCol} / ${totalCols}`;
        }
        if (prevBtn) {
            prevBtn.disabled = scrollLeft <= 10;
        }
        if (nextBtn) {
            nextBtn.disabled = scrollLeft >= maxScroll - 10;
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -getColumnWidth(), behavior: 'smooth' });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: getColumnWidth(), behavior: 'smooth' });
        });
    }

    track.addEventListener('scroll', () => {
        requestAnimationFrame(updateControls);
    }, { passive: true });

    // Keyboard navigation when track is focused
    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            track.scrollBy({ left: -getColumnWidth(), behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            track.scrollBy({ left: getColumnWidth(), behavior: 'smooth' });
        }
    });

    // Mouse drag-to-scroll functionality
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
        isDown = false;
    });

    track.addEventListener('mouseup', () => {
        isDown = false;
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;
        track.scrollLeft = scrollLeft - walk;
    });

    updateControls();
    window.addEventListener('resize', updateControls);
}

// --- Projects Carousel Interactive Scroll, Drag & Counter ---
function initProjectsCarousel() {
    const track = document.getElementById('projects-carousel-track');
    const prevBtn = document.getElementById('project-prev-btn');
    const nextBtn = document.getElementById('project-next-btn');
    const counter = document.getElementById('projects-counter');

    if (!track) return;

    const cards = track.querySelectorAll('.project-card-item');
    const total = cards.length;

    function getCardStep() {
        if (cards.length > 0) {
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.gap) || 16;
            return cards[0].offsetWidth + gap;
        }
        return track.clientWidth;
    }

    function updateControls() {
        if (cards.length === 0) return;
        const step = getCardStep();
        const scrollLeft = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;
        
        let currentIndex = Math.min(Math.round(scrollLeft / step) + 1, total);
        if (scrollLeft >= maxScroll - 10) {
            currentIndex = total;
        }
        if (counter) {
            counter.textContent = `${currentIndex} / ${total}`;
        }
        if (prevBtn) {
            prevBtn.disabled = scrollLeft <= 10;
        }
        if (nextBtn) {
            nextBtn.disabled = scrollLeft >= maxScroll - 10;
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: getCardStep(), behavior: 'smooth' });
        });
    }

    track.addEventListener('scroll', () => {
        requestAnimationFrame(updateControls);
    }, { passive: true });

    // Keyboard navigation when track is focused
    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            track.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            track.scrollBy({ left: getCardStep(), behavior: 'smooth' });
        }
    });

    // Mouse drag-to-scroll functionality for projects track
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
        isDown = false;
    });

    track.addEventListener('mouseup', () => {
        isDown = false;
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;
        track.scrollLeft = scrollLeft - walk;
    });

    // Initial update
    updateControls();
    window.addEventListener('resize', updateControls);
}


// --- Theme Switcher (Light / Dark Mode) ---
function initThemeToggle() {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    const htmlElement = document.documentElement;

    // Load saved theme preference or default to Dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        htmlElement.classList.remove('dark');
        updateToggleIcons('light');
    } else {
        htmlElement.classList.add('dark');
        updateToggleIcons('dark');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                updateToggleIcons('light');
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                updateToggleIcons('dark');
            }
        });
    });
}

function updateToggleIcons(currentTheme) {
    const icons = document.querySelectorAll('.theme-toggle-btn i');
    const labels = document.querySelectorAll('.theme-toggle-btn .theme-label');

    icons.forEach(icon => {
        if (currentTheme === 'dark') {
            icon.className = 'fa-solid fa-sun text-amber-400';
        } else {
            icon.className = 'fa-solid fa-moon text-indigo-600';
        }
    });

    labels.forEach(label => {
        if (currentTheme === 'dark') {
            label.textContent = 'Modo Claro';
        } else {
            label.textContent = 'Modo Oscuro';
        }
    });
}

// --- Mobile Navigation Menu ---
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// --- Interactive Tech Detail Card (Click to Inspect) ---
const TECH_DETAILS_DATA = {
    'react': {
        name: 'React',
        category: 'Frontend',
        badgeClass: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700/50',
        roleTag: 'Biblioteca SPA & UI Component-Based',
        icon: 'fa-brands fa-react',
        iconBg: 'bg-cyan-100 dark:bg-cyan-950/70 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/60',
        projectTag: 'Portal Federación de Karate & Plataforma Conpi',
        purpose: 'Biblioteca líder de JavaScript para crear interfaces de usuario interactivas, modulares y reactivas mediante una arquitectura de componentes desacoplados y un Virtual DOM de alto rendimiento.',
        usage: 'Desarrollo de portales web interactivos, gestión de estado con React Hooks (useState, useEffect, useContext), renderizado condicional de datos y consumo fluido de APIs REST.'
    },
    'javascript': {
        name: 'JavaScript (ES6+)',
        category: 'Lenguaje Core',
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50',
        roleTag: 'Lógica Web Dinámica Frontend & Backend',
        icon: 'fa-brands fa-js',
        iconBg: 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60',
        projectTag: 'Todos los proyectos Web & Scripts',
        purpose: 'Lenguaje fundamental y universal de la web moderna que permite dotar de dinamismo, interactividad cliente-servidor, manipulación ágil del DOM y programación asíncrona eficiente.',
        usage: 'Programación de lógica de negocio en cliente y servidor, manejo asíncrono con Promises y Async/Await, peticiones con Fetch/Axios y validaciones dinámicas de formularios.'
    },
    'kotlin': {
        name: 'Kotlin',
        category: 'Mobile & Multiplataforma',
        badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300 border border-purple-300 dark:border-purple-700/50',
        roleTag: 'Desarrollo Nativo Android con Jetpack Compose',
        icon: 'fa-brands fa-android',
        iconBg: 'bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60',
        projectTag: 'App Canasta Orgánica & App Conpi',
        purpose: 'Lenguaje moderno, conciso y con seguridad contra punteros nulos (Null Safety), adoptado oficialmente por Google como el estándar primordial para aplicaciones Android de alto rendimiento.',
        usage: 'Construcción de interfaces de usuario nativas y declarativas con Jetpack Compose, gestión de concurrencia y flujo de datos con Corrutinas & StateFlow, y consumo de servicios REST móviles.'
    },
    'android-studio': {
        name: 'Android Studio',
        category: 'Entorno Móvil',
        badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50',
        roleTag: 'IDE Oficial para el Ecosistema Android',
        icon: 'fa-solid fa-mobile-screen-button',
        iconBg: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60',
        projectTag: 'Desarrollo de Apps Nativas (Canasta Orgánica)',
        purpose: 'Entorno de desarrollo integrado especializado basado en IntelliJ IDEA con emulador de alta velocidad, inspector de layout, profiler de recursos y soporte integral para Gradle.',
        usage: 'Configuración y resolución de dependencias con Gradle (KTS), emulación y pruebas en dispositivos virtuales y físicos, análisis de rendimiento de Compose y generación de compilaciones APK/AAB.'
    },
    'nodejs': {
        name: 'Node.js',
        category: 'Backend Runtime',
        badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50',
        roleTag: 'Entorno de Ejecución Servidor V8',
        icon: 'fa-brands fa-node-js',
        iconBg: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60',
        projectTag: 'Backends de Servicios Web & APIs',
        purpose: 'Entorno de ejecución de JavaScript del lado del servidor orientado a eventos asíncronos y no bloqueantes, ideal para construir arquitecturas de microservicios y APIs escalables.',
        usage: 'Creación de servidores REST con Express, controladores de autenticación protegidos por tokens JWT, middlewares de seguridad (CORS, Helmet) y conexión a bases de datos relacionales.'
    },
    'springboot': {
        name: 'Spring Boot',
        category: 'Backend Framework',
        badgeClass: 'bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-300 border border-green-300 dark:border-green-700/50',
        roleTag: 'Framework Empresarial de Grado Corporativo',
        icon: 'fa-solid fa-leaf',
        iconBg: 'bg-green-100 dark:bg-green-950/70 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800/60',
        projectTag: 'Servicios de Datos & Microservicios',
        purpose: 'Framework de nivel empresarial que simplifica la creación de servicios backend listos para producción con inyección de dependencias, configuración automática y gran estabilidad.',
        usage: 'Diseño de controladores RESTful, persistencia de datos mediante Spring Data JPA / Hibernate, validación estructurada de modelos y diseño de capas de servicio desacopladas.'
    },
    'restapi': {
        name: 'REST APIs',
        category: 'Arquitectura Backend',
        badgeClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700/50',
        roleTag: 'Integración y Comunicación de Servicios',
        icon: 'fa-solid fa-network-wired',
        iconBg: 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60',
        projectTag: 'Interconexión Web, Backend y Móvil',
        purpose: 'Estándar arquitectónico cliente-servidor sin estado que utiliza métodos HTTP (GET, POST, PUT, DELETE) y formato JSON para comunicar sistemas de manera desacoplada.',
        usage: 'Modelado de endpoints consistentes, manejo de códigos de respuesta HTTP estandarizados (200, 201, 400, 404, 500), paginación y documentación de contratos entre Frontend y Backend.'
    },
    'postgresql': {
        name: 'PostgreSQL',
        category: 'Base de Datos',
        badgeClass: 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300 border border-sky-300 dark:border-sky-700/50',
        roleTag: 'Motor Relacional SQL Avanzado (RDBMS)',
        icon: 'fa-solid fa-database',
        iconBg: 'bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800/60',
        projectTag: 'Persistencia Principal (Federación & Conpi)',
        purpose: 'Sistema de base de datos relacional de código abierto más avanzado del mundo, reconocido por su robustez, estricto cumplimiento ACID y soporte de tipos de datos avanzados como JSONB.',
        usage: 'Modelado entidad-relación normalizado, definición de claves foráneas y restricciones de integridad, índices para optimización de consultas y consultas complejas con Joins y agregaciones.'
    },
    'supabase': {
        name: 'Supabase',
        category: 'BaaS / Cloud DB',
        badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50',
        roleTag: 'Backend-as-a-Service con PostgreSQL Nativo',
        icon: 'fa-solid fa-bolt',
        iconBg: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60',
        projectTag: 'Gestión Cloud & Autenticación',
        purpose: 'Alternativa open source a Firebase que proporciona una base de datos PostgreSQL completa en la nube, APIs REST automáticas, autenticación de usuarios y almacenamiento de archivos.',
        usage: 'Implementación de autenticación segura, políticas de seguridad a nivel de fila (Row Level Security - RLS) para proteger datos de usuarios y almacenamiento en la nube para recursos multimedia.'
    },
    'firebase': {
        name: 'Firebase',
        category: 'BaaS / Cloud DB',
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50',
        roleTag: 'Firestore, Auth & Realtime Database',
        icon: 'fa-solid fa-fire',
        iconBg: 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60',
        projectTag: 'App Inmobiliaria & Prototipos Rápidos',
        purpose: 'Plataforma en la nube de Google diseñada para el desarrollo acelerado de aplicaciones con sincronización de datos en tiempo real, autenticación multicanal y persistencia offline.',
        usage: 'Gestión de colecciones y documentos en Cloud Firestore para sincronización instantánea de publicaciones y mensajes, Firebase Authentication y hosting seguro.'
    },
    'bootstrap': {
        name: 'Bootstrap 5',
        category: 'Frontend Framework',
        badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300 border border-purple-300 dark:border-purple-700/50',
        roleTag: 'Sistema de Grillas & UI Responsivo',
        icon: 'fa-brands fa-bootstrap',
        iconBg: 'bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60',
        projectTag: 'Portal Federación Chilena de Karate',
        purpose: 'Framework CSS consolidado para diseño web responsivo rápido, con sistema de grillas flexible de 12 columnas y componentes accesibles que garantizan compatibilidad entre navegadores.',
        usage: 'Maquetación de paneles administrativos y vistas públicas, diseño responsivo mobile-first, tablas de datos optimizadas para visualización en tabletas/móviles y ventanas modales.'
    },
    'html5': {
        name: 'HTML5 Semántico',
        category: 'Estructura Web',
        badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-300 border border-orange-300 dark:border-orange-700/50',
        roleTag: 'Estructura, Semántica & Accesibilidad',
        icon: 'fa-brands fa-html5',
        iconBg: 'bg-orange-100 dark:bg-orange-950/70 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60',
        projectTag: 'Todos los proyectos Web',
        purpose: 'Estándar principal del maquetado web que proporciona elementos semánticos precisos para enriquecer el significado del contenido, mejorar la accesibilidad (a11y) y optimizar el posicionamiento SEO.',
        usage: 'Construcción de vistas con etiquetas semánticas (header, nav, main, section, article, footer), formularios con validación nativa y atributos ARIA para accesibilidad universal.'
    },
    'css3': {
        name: 'CSS3 / Modern CSS',
        category: 'Estilos Web',
        badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border border-blue-300 dark:border-blue-700/50',
        roleTag: 'Flexbox, Grid, Animaciones & Temas',
        icon: 'fa-brands fa-css3-alt',
        iconBg: 'bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60',
        projectTag: 'Todos los proyectos Web & UI',
        purpose: 'Lenguaje de presentación y estilo que permite crear layouts adaptables mediante CSS Grid y Flexbox, efectos visuales modernos, animaciones @keyframes y esquemas de color dinámicos.',
        usage: 'Implementación de temas visuales dinámicos (modo claro y oscuro), diseño de micro-interacciones suaves, efectos de elevación/sombras y variables CSS (Custom Properties) personalizadas.'
    },
    'aws': {
        name: 'Amazon Web Services (AWS)',
        category: 'Cloud & Infraestructura',
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50',
        roleTag: 'VPC, EC2 & Seguridad en la Nube',
        icon: 'fa-brands fa-aws',
        iconBg: 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60',
        projectTag: 'Infraestructura Cloud & Despliegues',
        purpose: 'Plataforma integral de computación en la nube que ofrece servicios de servidores virtuales, redes seguras, almacenamiento elástico y herramientas de alta disponibilidad.',
        usage: 'Despliegue y configuración de instancias EC2 con Linux, configuración de subredes y tablas de ruteo con VPC, gestión de grupos de seguridad (Security Groups) y accesos SSH con llaves criptográficas.'
    },
    'docker': {
        name: 'Docker',
        category: 'DevOps & Contenedores',
        badgeClass: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700/50',
        roleTag: 'Contenedorización de Aplicaciones',
        icon: 'fa-brands fa-docker',
        iconBg: 'bg-cyan-100 dark:bg-cyan-950/70 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/60',
        projectTag: 'Ambientes de Desarrollo & Producción',
        purpose: 'Tecnología de virtualización ligera a nivel de sistema operativo que empaqueta código, dependencias y librerías en contenedores aislados, eliminando diferencias entre local y servidor.',
        usage: 'Creación de Dockerfiles y orquestación con docker-compose para levantar entornos replicables de backend y bases de datos PostgreSQL en minutos sin conflictos de dependencias.'
    },
    'git': {
        name: 'Git',
        category: 'Control de Versiones',
        badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-300 border border-orange-300 dark:border-orange-700/50',
        roleTag: 'Sistema de Control de Versiones Distribuido',
        icon: 'fa-brands fa-git-alt',
        iconBg: 'bg-orange-100 dark:bg-orange-950/70 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60',
        projectTag: 'Todos los proyectos de software',
        purpose: 'Herramienta estándar de la industria para llevar el control cronológico de modificaciones en el código fuente, gestionar ramas paralelas, fusionar cambios y auditar el historial de código.',
        usage: 'Uso de flujos de trabajo basados en ramas (feature branching), resolución precisa de conflictos de merge, commits con nomenclatura semántica y preparación de versiones estables.'
    },
    'github': {
        name: 'GitHub',
        category: 'Colaboración & CI/CD',
        badgeClass: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700',
        roleTag: 'Repositorios Remotos & Publicación Web',
        icon: 'fa-brands fa-github',
        iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700',
        projectTag: 'Gestión de Código & Portafolio Web',
        purpose: 'Plataforma en la nube para alojar repositorios Git, coordinar revisiones de código mediante Pull Requests, documentar proyectos y desplegar aplicaciones web estáticas.',
        usage: 'Publicación del presente portafolio con GitHub Pages, control de repositorios públicos y privados, documentación de proyectos con README técnicos y seguimiento de issues.'
    },
    'kali': {
        name: 'Kali Linux',
        category: 'Ciberseguridad',
        badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border border-blue-300 dark:border-blue-700/50',
        roleTag: 'Auditorías de Seguridad & Pentesting',
        icon: 'fa-brands fa-linux',
        iconBg: 'bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60',
        projectTag: 'Laboratorios de Hacking Ético & Pentesting',
        purpose: 'Distribución especializada de Linux orientada a profesionales de seguridad de la información, equipada con cientos de utilidades para auditorías de redes, análisis forense y pruebas de penetración.',
        usage: 'Entorno central para realizar escaneos de reconocimiento de puertos y servicios con Nmap, análisis de superficie de ataque, auditoría de contraseñas y hardening defensivo de servidores.'
    },
    'metasploit': {
        name: 'Metasploit Framework',
        category: 'Ciberseguridad',
        badgeClass: 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300 border border-red-300 dark:border-red-700/50',
        roleTag: 'Validación de Exploits & Ciberdefensa',
        icon: 'fa-solid fa-shield-virus',
        iconBg: 'bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/60',
        projectTag: 'Pruebas de Penetración Controladas',
        purpose: 'Framework de ciberseguridad para validar de manera controlada si las vulnerabilidades detectadas en un sistema son explotables, permitiendo verificar el impacto real de las amenazas.',
        usage: 'Simulación de ataques en entornos de laboratorio controlados para comprobar la efectividad de los parches de seguridad, análisis de payloads defensivos y recomendaciones de mitigación.'
    },
    'openvas': {
        name: 'OpenVAS',
        category: 'Ciberseguridad',
        badgeClass: 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300 border border-teal-300 dark:border-teal-700/50',
        roleTag: 'Escáner y Gestión de Vulnerabilidades',
        icon: 'fa-solid fa-user-shield',
        iconBg: 'bg-teal-100 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800/60',
        projectTag: 'Evaluación y Reportes de Seguridad',
        purpose: 'Sistema de escaneo de vulnerabilidades de código abierto que audita servicios, puertos y configuraciones de red, contrastándolos con miles de pruebas de vulnerabilidad en bases CVE actualizadas.',
        usage: 'Configuración y ejecución de escaneos periódicos en redes, priorización de brechas según métricas CVSS y elaboración de reportes ejecutivos con recomendaciones técnicas de remediación.'
    },
    'inconcert': {
        name: 'Inconcert',
        category: 'CRM & Telecom',
        badgeClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700/50',
        roleTag: 'Contact Center Omnicanal & Telefonía IP',
        icon: 'fa-solid fa-headset',
        iconBg: 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60',
        projectTag: 'Operaciones de Contact Center & Soporte',
        purpose: 'Solución empresarial de gestión de interacciones omnicanal (voz, chat, correo y mensajería instantánea) diseñada para optimizar la productividad operativa de equipos de soporte al cliente.',
        usage: 'Configuración y monitoreo de campañas telefónicas entrantes y salientes, gestión de colas de atención en tiempo real, supervisión de estados de agentes y reporte de incidentes.'
    },
    'neotel': {
        name: 'Neotel',
        category: 'CRM & Telecom',
        badgeClass: 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300 border border-sky-300 dark:border-sky-700/50',
        roleTag: 'Telefonía IP & Marcación Predictiva',
        icon: 'fa-solid fa-phone-volume',
        iconBg: 'bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800/60',
        projectTag: 'Soporte Operativo & Enrutamiento Telefónico',
        purpose: 'Software de telefonía sobre protocolo IP (VoIP) con marcadores predictivos, grabación de llamadas y distribución automática de llamadas para centros de atención y soporte.',
        usage: 'Supervisión de troncales SIP, diagnóstico y resolución de problemas de conectividad en líneas de voz, parametrización de campañas y análisis de niveles de servicio (SLA).'
    },
    'geovictoria': {
        name: 'GeoVictoria',
        category: 'Herramienta Operativa',
        badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50',
        roleTag: 'Control de Asistencia & Biometría',
        icon: 'fa-solid fa-fingerprint',
        iconBg: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60',
        projectTag: 'Gestión de Turnos y Personal Técnico',
        purpose: 'Plataforma líder para el control de asistencia y turnos laborales mediante validación biométrica (huella, reconocimiento facial) y geolocalización, con validez jurídica y fiscal.',
        usage: 'Administración de turnos de equipos de soporte técnico, validación de marcas y justificaciones de ausencias, resolución de inconsistencias y generación de reportes para recursos humanos.'
    },
    'siebel': {
        name: 'Siebel CRM (Oracle)',
        category: 'CRM Empresarial',
        badgeClass: 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300 border border-red-300 dark:border-red-700/50',
        roleTag: 'Gestión Integral de Clientes & Servicios',
        icon: 'fa-solid fa-building-user',
        iconBg: 'bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/60',
        projectTag: 'Operaciones Telecom & Soporte Nivel 1/2',
        purpose: 'Sistema de Customer Relationship Management de grado corporativo de Oracle, utilizado por gigantes de telecomunicaciones y banca para gestionar todo el ciclo de vida del cliente.',
        usage: 'Creación y seguimiento de órdenes de servicio técnico, gestión de tickets de escalamiento, verificación de contratos comerciales y consulta detallada de historial de interacciones.'
    },
    'genesys': {
        name: 'Genesys',
        category: 'Contact Center Cloud',
        badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-300 border border-orange-300 dark:border-orange-700/50',
        roleTag: 'Enrutamiento Inteligente & Cloud Contact',
        icon: 'fa-solid fa-server',
        iconBg: 'bg-orange-100 dark:bg-orange-950/70 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60',
        projectTag: 'Flujos de Soporte y Atención al Cliente',
        purpose: 'Plataforma en la nube para la orquestación inteligente de experiencias de cliente, gestión de colas basadas en habilidades (Skills-based Routing) y analítica operativa en tiempo real.',
        usage: 'Monitoreo de tráfico y tiempos medios de atención (TMO), diagnóstico de desviaciones en flujos de enrutamiento y soporte continuo a agentes y supervisores en plataformas de telecomunicaciones.'
    },
    'bscs': {
        name: 'BSCS (Ericsson)',
        category: 'Telecom Billing',
        badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border border-blue-300 dark:border-blue-700/50',
        roleTag: 'Facturación & Tarificación en Telecomunicaciones',
        icon: 'fa-solid fa-file-invoice-dollar',
        iconBg: 'bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60',
        projectTag: 'Soporte de Billing & Cuentas de Abonados',
        purpose: 'Sistema de soporte al negocio (BSS) líder a nivel global desarrollado por Ericsson para la tarificación, ciclo de facturación y control de saldo para líneas móviles y fijas.',
        usage: 'Diagnóstico de cuentas bloqueadas por motivos financieros o técnicos, verificación de cobros y servicios facturados, y validación de planes activos de abonados en telecomunicaciones.'
    },
    'vscode': {
        name: 'Visual Studio Code',
        category: 'Editor & Productividad',
        badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border border-blue-300 dark:border-blue-700/50',
        roleTag: 'Editor de Código Principal & Debugger',
        icon: 'fa-solid fa-code',
        iconBg: 'bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60',
        projectTag: 'Entorno Diario de Desarrollo Web & Full Stack',
        purpose: 'Editor de código fuente extensible y ligero que combina la rapidez de un editor de texto con herramientas avanzadas como depuración en vivo, terminal integrada y control Git nativo.',
        usage: 'Entorno de trabajo cotidiano: desarrollo de proyectos con React, JavaScript, Node.js y maquetación web, uso de extensiones de linter (ESLint, Prettier), depuración y control de versiones.'
    },
    'photoshop': {
        name: 'Adobe Photoshop',
        category: 'Diseño & UI Assets',
        badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border border-blue-300 dark:border-blue-700/50',
        roleTag: 'Edición Gráfica & Optimización de Assets',
        icon: 'fa-solid fa-image',
        iconBg: 'bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60',
        projectTag: 'Recursos Visuales del Portafolio & Proyectos',
        purpose: 'Software estándar de la industria gráfica para la edición, retoque fotográfico, manipulación de capas y optimización de recursos visuales para medios digitales e interfaces web.',
        usage: 'Retoque y recorte fino de fotos de perfil, preparación de mockups, compresión optimizada en formatos modernos para acelerar los tiempos de carga web y creación de composiciones visuales.'
    },
    'ia-dev': {
        name: 'Herramientas de IA para Desarrollo',
        category: 'Productividad & IA',
        badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300 border border-purple-300 dark:border-purple-700/50',
        roleTag: 'Aceleración de Código, Refactor & Debugging',
        icon: 'fa-solid fa-brain',
        iconBg: 'bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60',
        projectTag: 'Optimización de Flujo de Trabajo y Eficiencia',
        purpose: 'Modelos avanzados de Inteligencia Artificial (Claude, GitHub Copilot, ChatGPT) para acelerar la escritura de código, validar arquitecturas, refactorizar lógica y diagnosticar errores.',
        usage: 'Pair programming asistido por IA: diseño de algoritmos limpios, documentación ágil de funciones, pruebas unitarias y adopción rigurosa de mejores prácticas de desarrollo y accesibilidad UX/UI.'
    }
};

function initTechDetailCard() {
    const container = document.getElementById('tech-detail-card');
    const cards = document.querySelectorAll('.tech-carousel-card[data-tech-id]');

    if (!container || !cards.length) return;

    let activeTechId = null;

    function closeTechDetail() {
        activeTechId = null;
        cards.forEach(card => card.classList.remove('active'));
        container.innerHTML = '';
    }

    function openTechDetail(techId) {
        const data = TECH_DETAILS_DATA[techId];
        if (!data) return;

        activeTechId = techId;

        // Highlight matching card in carousel
        cards.forEach(card => {
            if (card.getAttribute('data-tech-id') === techId) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Generate detail card HTML
        container.innerHTML = `
            <div class="animate-detail-card mt-4 sm:mt-5 max-w-4xl mx-auto rounded-2xl p-5 sm:p-6 bg-white dark:bg-slate-900/90 border-2 border-indigo-200 dark:border-slate-800 shadow-xl shadow-indigo-100/60 dark:shadow-black/50 transition-all duration-300 relative">
                <!-- Header of Detail Card -->
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-indigo-100 dark:border-slate-800">
                    <div class="flex items-center gap-3.5 pr-8 sm:pr-0">
                        <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm ${data.iconBg}">
                            <i class="${data.icon}"></i>
                        </div>
                        <div>
                            <div class="flex flex-wrap items-center gap-2">
                                <h4 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-heading">${data.name}</h4>
                                <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${data.badgeClass}">${data.category}</span>
                            </div>
                            <p class="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">${data.roleTag}</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-2.5 self-start sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
                        ${data.projectTag ? `
                        <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-blue-950/50 text-indigo-700 dark:text-blue-300 border border-indigo-200 dark:border-blue-800/60 text-xs font-medium">
                            <i class="fa-solid fa-circle-check text-indigo-600 dark:text-blue-400 text-xs"></i>
                            <span>${data.projectTag}</span>
                        </div>` : '<div></div>'}

                        <!-- Close button -->
                        <button id="close-tech-detail-btn" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 dark:hover:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors" title="Cerrar detalle" aria-label="Cerrar detalle">
                            <i class="fa-solid fa-xmark text-base"></i>
                        </button>
                    </div>
                </div>

                <!-- Two-column description grid with blue and purple palette borders -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- ¿Para qué sirve? (Blue palette) -->
                    <div class="bg-blue-50/40 dark:bg-slate-800/40 rounded-xl p-4 border border-blue-200 dark:border-slate-800/80 flex flex-col justify-start">
                        <div class="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-slate-300">
                            <i class="fa-solid fa-circle-question text-blue-600 text-sm"></i>
                            <span>¿Para qué sirve?</span>
                        </div>
                        <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            ${data.purpose}
                        </p>
                    </div>

                    <!-- ¿Cómo la he usado yo? (Purple palette) -->
                    <div class="bg-purple-50/40 dark:bg-slate-800/40 rounded-xl p-4 border border-purple-200 dark:border-blue-900/30 flex flex-col justify-start">
                        <div class="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-cyan-400">
                            <i class="fa-solid fa-laptop-code text-purple-600 dark:text-cyan-400 text-sm"></i>
                            <span>¿Cómo la he usado yo?</span>
                        </div>
                        <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                            ${data.usage}
                        </p>
                    </div>
                </div>
            </div>
        `;

        // Attach listener to close button inside the card
        const closeBtn = document.getElementById('close-tech-detail-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeTechDetail();
            });
        }
    }

    function toggleTechDetail(techId) {
        if (activeTechId === techId) {
            closeTechDetail();
        } else {
            openTechDetail(techId);
        }
    }

    // Attach click and keyboard listeners to all cards in the carousel
    cards.forEach(card => {
        const techId = card.getAttribute('data-tech-id');
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Ver detalles de ${techId}`);

        card.addEventListener('click', () => {
            toggleTechDetail(techId);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTechDetail(techId);
            }
        });
    });

    // Start closed by default: do not render anything until user clicks
    closeTechDetail();
}
