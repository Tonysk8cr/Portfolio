document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const toggle = document.getElementById('darkModeToggle');
    const header = document.querySelector('.site-header');
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    // 1. Aplicar tema (la clase inicial ya la pone el script inline del <head>)
    const applyTheme = (dark) => {
        root.classList.toggle('dark-mode', dark);
        toggle.setAttribute('aria-pressed', String(dark));
        themeColor.setAttribute('content', dark ? '#0b1120' : '#f7f7f5');
    };

    const readStored = () => {
        try { return localStorage.getItem('dark-mode'); } catch (e) { return null; }
    };

    applyTheme(root.classList.contains('dark-mode'));

    // 2. Toggle manual
    toggle.addEventListener('click', () => {
        const dark = !root.classList.contains('dark-mode');
        applyTheme(dark);
        try { localStorage.setItem('dark-mode', dark); } catch (e) {}
    });

    // 3. Cambios del sistema en tiempo real (solo si el usuario no forzó modo)
    prefersDarkMode.addEventListener('change', (event) => {
        if (readStored() === null) applyTheme(event.matches);
    });

    // 4. Borde del header al hacer scroll (observer, sin listener de scroll)
    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;';
    document.body.prepend(sentinel);
    new IntersectionObserver(([entry]) => {
        header.classList.toggle('is-scrolled', !entry.isIntersecting);
    }).observe(sentinel);
});
