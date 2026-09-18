function goToPage(page) {
    window.location.href = page;
}

// Dark mode toggle — only on modern-theme pages
if (document.body.classList.contains('modern-theme')) {
    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.innerHTML = `
        <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>`;
    document.body.appendChild(btn);

    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark-mode');
    }

    btn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Archive mode dark mode toggle
if (document.body.classList.contains('archive-mode')) {
    const archiveBtn = document.getElementById('archive-theme-toggle');
    if (archiveBtn) {
        archiveBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
}

// Floating rotating globe widget, shown on every page
import("./globe.js");

// Sort publications within each section (Conferences, Journals) by year, most recent first
document.querySelectorAll('.pub-list').forEach(pubList => {
    const entries = Array.from(pubList.querySelectorAll(':scope > .pub-entry[data-year]'));
    entries.sort((a, b) => b.dataset.year - a.dataset.year);
    entries.forEach(entry => pubList.appendChild(entry));
});

// Check if popupOverlay exists before accessing it
const popupOverlay = document.getElementById('popup');
if (popupOverlay) {
    const closeButton = document.getElementById('close-button');
    const popupTriggers = document.querySelectorAll('.popup-trigger');
    const popupImage = document.querySelector('.popup-image');

    // Check if closeButton exists before adding event listener
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            popupOverlay.style.display = 'none';
        });
    }

    popupTriggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            if (window.innerWidth >= 768) {
                popupImage.src = event.currentTarget.querySelector('img').src;
                popupOverlay.style.display = 'flex';
            }
        });
    });

    popupImage.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop();

    requestAnimationFrame(() => {
        document.querySelectorAll(".navbar button, .simple-nav-link").forEach(el => {
            const elPage = el.getAttribute("data-page");
            if (elPage === currentPage || (elPage === "index.html" && currentPage === "")) {
                el.classList.add("active");
            } else {
                el.classList.remove("active");
            }
        });
    });
});




