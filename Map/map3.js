const svg = document.getElementById('svg2');
const statePaths = document.querySelectorAll('.mapdiv path');
let currentZoomedState = null; // Track the currently zoomed state

function resetViewBox() {
    svg.setAttribute('viewBox', '0 0 700 700'); // Reset the viewBox
    hideAllPopups(); // Hide all pop-up boxes when zooming out
}

function zoomToState(statePath, category) {
    const bbox = statePath.getBBox();
    const padding = 20;
    const viewBox = `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + 2 * padding} ${bbox.height + 2 * padding}`;
    svg.setAttribute('viewBox', viewBox);

    // Hide all pop-up boxes when zooming in
    hideAllPopups();
    
    // Show the corresponding pop-up box based on the category
    const popupId = `${category}-popup`;
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'block';
    }
}

function hideAllPopups() {
    const popups = document.querySelectorAll('.popup-box');
    popups.forEach(popup => {
        popup.style.display = 'none';
    });
}

resetViewBox();

statePaths.forEach((path) => {
    const category = path.getAttribute('data-category'); // Add a data attribute to specify the category
    path.addEventListener('click', () => {
        // Check if the clicked state is already zoomed
        if (currentZoomedState !== path) {
            // Zoom in on the clicked state with an animation
            zoomToState(path, category); // Pass the category
            currentZoomedState = path;
        } else {
            // Zoom out to the original size with an animation
            resetViewBox();
            currentZoomedState = null;
        }
    });
});

svg.addEventListener('click', (e) => {
    // Check if the click occurred outside any state path
    if (!statePaths.includes(e.target) && currentZoomedState) {
        // Zoom out to the original size with an animation
        resetViewBox();
        currentZoomedState = null;
    }
});
