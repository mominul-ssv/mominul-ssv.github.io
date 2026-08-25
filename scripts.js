function goToPage(page) {
    window.location.href = page;
}

function showPubTab(tab) {
    document.querySelectorAll('.pub-tab-content').forEach(section => {
        section.classList.toggle('hidden', section.id !== `tab-${tab}`);
    });
    document.querySelectorAll('.pub-tabs button').forEach(button => {
        button.classList.toggle('active', button.dataset.tab === tab);
    });
}

// Sort publications within each tab by year, most recent first,
// group them under a thin year divider, and show a count on each tab button
document.querySelectorAll('.pub-tab-content').forEach(section => {
    const cards = Array.from(section.querySelectorAll(':scope > .card-body[data-year]'));
    cards.sort((a, b) => b.dataset.year - a.dataset.year);

    section.querySelectorAll(':scope > .pub-year-divider').forEach(el => el.remove());

    let lastYear = null;
    cards.forEach(card => {
        if (card.dataset.year !== lastYear) {
            const divider = document.createElement('div');
            divider.className = 'pub-year-divider';
            divider.textContent = card.dataset.year;
            section.appendChild(divider);
            lastYear = card.dataset.year;
        }
        section.appendChild(card);
    });

    const tabKey = section.id.replace('tab-', '');
    const countEl = document.querySelector(`.pub-tabs button[data-tab="${tabKey}"] .tab-count`);
    if (countEl) countEl.textContent = cards.length;
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
        document.querySelectorAll(".navbar button").forEach(button => {
            const buttonPage = button.getAttribute("data-page");
            if (buttonPage === currentPage || (buttonPage === "index.html" && currentPage === "")) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    });
});




