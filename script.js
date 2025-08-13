document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById('darkModeToggle');
    const nameSpan = document.getElementById('name');
    const docImg = document.getElementById('curriculum');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    // 1️⃣ Detectar estado inicial: localStorage > preferencia del sistema
    let storedTheme = localStorage.getItem('dark-mode');
    let isDark = storedTheme !== null ? storedTheme === 'true' : prefersDarkMode.matches;

    // 2️⃣ Aplicar estado inicial
    document.body.classList.toggle('dark-mode', isDark);
    toggle.checked = isDark;
    nameSpan.classList.add(isDark ? "color-cycle-dark" : "color-cycle-light");
    docImg.src = isDark ? "img/document.svg" : "img/document-dark.svg";

    // 3️⃣ Evento para el toggle manual
    toggle.addEventListener('change', () => {
        const dark = toggle.checked;
        document.body.classList.toggle('dark-mode', dark);
        localStorage.setItem('dark-mode', dark);

        nameSpan.classList.remove("color-cycle-light", "color-cycle-dark");
        nameSpan.classList.add(dark ? "color-cycle-dark" : "color-cycle-light");
        docImg.src = dark ? "img/document.svg" : "img/document-dark.svg";
    });

    // 4️⃣ Escuchar cambios del sistema en tiempo real (solo si el usuario no forzó modo)
    prefersDarkMode.addEventListener('change', (event) => {
        if (localStorage.getItem('dark-mode') === null) {
            const dark = event.matches;
            document.body.classList.toggle('dark-mode', dark);
            toggle.checked = dark;

            nameSpan.classList.remove("color-cycle-light", "color-cycle-dark");
            nameSpan.classList.add(dark ? "color-cycle-dark" : "color-cycle-light");
            docImg.src = dark ? "img/document.svg" : "img/document-dark.svg";
        }
    });
});
