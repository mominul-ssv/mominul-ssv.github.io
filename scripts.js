function goToPage(page) {
    window.location.href = page;
}

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

