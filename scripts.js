// JavaScript code to handle section toggling
function showSection(sectionId) {
    var sections = document.querySelectorAll(".section-content");
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].id === sectionId) {
            sections[i].style.display = "block";
        } else {
            sections[i].style.display = "none";
        }
    }
}

// Show the "Research" section by default
showSection("research");

// Event listeners for the buttons to toggle the corresponding sections
document.getElementById("btn-research").addEventListener("click", function () {
    showSection("research");
});

document.getElementById("btn-work-experience").addEventListener("click", function () {
    showSection("work-experience");
});

document.getElementById("btn-education").addEventListener("click", function () {
    showSection("education");
});

document.getElementById("btn-projects").addEventListener("click", function () {
    showSection("projects");
});

document.getElementById("btn-skills").addEventListener("click", function () {
    showSection("skills");
});

document.getElementById("btn-honors").addEventListener("click", function () {
    showSection("honors");
});

document.getElementById("btn-certificates").addEventListener("click", function () {
    showSection("certificates");
});

document.getElementById("btn-notes").addEventListener("click", function () {
    showSection("notes");
});

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