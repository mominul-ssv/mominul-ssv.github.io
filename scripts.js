function goToPage(page) {
    window.location.href = page;
}

function adjustFooterPosition() {
    var bodyHeight = document.body.scrollHeight;
    var viewportHeight = window.innerHeight;
    var footer = document.querySelector('.footer');

    if (bodyHeight > viewportHeight) {
        footer.style.position = 'relative';
    } else {
        footer.style.position = 'absolute';
    }
}

// Run on page load and window resize
window.addEventListener('load', adjustFooterPosition);
window.addEventListener('resize', adjustFooterPosition);

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