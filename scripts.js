function goToPage(page) {
    window.location.href = page;
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




