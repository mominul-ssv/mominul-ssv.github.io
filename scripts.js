function goToPage(page) {
    window.location.href = page;
}

// popup trigger
const popupOverlay = document.getElementById('popup');
const closeButton = document.getElementById('close-button');
const popupTriggers = document.querySelectorAll('.popup-trigger');
const popupImage = document.querySelector('.popup-image');

popupTriggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
        if (window.innerWidth >= 768) {
            popupImage.src = event.currentTarget.querySelector('img').src;
            popupOverlay.style.display = 'flex';
        }
    });
});

closeButton.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
});

popupImage.addEventListener('click', (event) => {
    event.stopPropagation();
});