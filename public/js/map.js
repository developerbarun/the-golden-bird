const svg = document.getElementById('svg2');
const statePaths = document.querySelectorAll('.mapdiv path');
let currentZoomedState = null; // Track the currently zoomed state
const targetElement = document.getElementById("map");
const clickmap = document.getElementById('IN-UP');
const popup = document.getElementById('popup-container');
var isRed = false;
const pathElement = document.getElementById('IN-UP');


let i = 0;
let isElementCreated = false;


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



//For popups in map-zoom
clickmap.addEventListener('click', function (e) {
    
    if (!isElementCreated) {
        if (!isRed) {
            pathElement.classList.add('red-fill');
        } else {
            pathElement.classList.remove('red-fill');
        }

        // isRed = !isRed;


        //1st
        // Create the card
        var div1 = document.createElement("div");
        div1.classList.add("card");
        div1.setAttribute('id', 'food-popup');
        div1.classList.add("card1");
        // div1.setAttribute('id', 'value' + i);
        popup.appendChild(div1);
        // Create the imgbox
        var div2 = document.createElement("div");
        div2.classList.add("imgbox");
        var img = document.createElement("img");
        img.setAttribute("src", "https://www.holidify.com/images/cmsuploads/compressed/Nargisi_Koftas_in_Curry_20200113161438.jpg");
        div2.appendChild(img);
        div1.appendChild(div2);

        // Create the content div
        var contentDiv = document.createElement("div");
        contentDiv.classList.add("content");
        var heading = document.createElement("h2");
        heading.textContent = "Food";
        var content = document.createElement("p");
        content.classList.add("p1");
        content.textContent = "The term is sometimes used quite loosely,characters such as curly quotes, non-breaking spaces, soft hyphens, em dashes, and/or ligatures; or other things.";
        // contentDiv.appendChild(heading);
        div1.appendChild(heading);
        contentDiv.appendChild(content);
        div1.appendChild(contentDiv);
        targetElement.appendChild(popup);

        //2nd
        // Create the card
        var div1 = document.createElement("div");
        div1.classList.add("card");
        div1.setAttribute('id', 'art-popup');
        div1.classList.add("card1");
        // div1.setAttribute('id', 'value' + i);
        popup.appendChild(div1);
        // Create the imgbox
        var div2 = document.createElement("div");
        div2.classList.add("imgbox");
        var img = document.createElement("img");
        img.setAttribute("src", "https://satyamfashion.ac.in/blog/wp-content/uploads/2020/11/image002.jpg");
        div2.appendChild(img);
        div1.appendChild(div2);

        // Create the content div
        var contentDiv = document.createElement("div");
        contentDiv.classList.add("content");
        var heading = document.createElement("h2");
        heading.textContent = "Arts";
        var content = document.createElement("p");
        content.classList.add("p1");
        content.textContent = "The term is sometimes used quite loosely,characters such as curly quotes, non-breaking spaces, soft hyphens, em dashes, and/or ligatures; or other things.";
        // contentDiv.appendChild(heading);
        div1.appendChild(heading);
        contentDiv.appendChild(content);
        div1.appendChild(contentDiv);
        targetElement.appendChild(popup);

        //3rd
        // Create the card
        var div1 = document.createElement("div");
        div1.classList.add("card");
        div1.setAttribute('id', 'monuments-popup');
        popup.appendChild(div1);
        // Create the imgbox
        var div2 = document.createElement("div");
        div2.classList.add("imgbox");
        var img = document.createElement("img");
        img.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/1280px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg");
        div2.appendChild(img);
        div1.appendChild(div2);
        // Create the content div
        var contentDiv = document.createElement("div");
        contentDiv.classList.add("content");
        var heading = document.createElement("h2");
        heading.textContent = "Monuments";
        var content = document.createElement("p");
        content.classList.add("p1");
        content.textContent = "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra.It was commissioned in 1632 by the Mughal emperor,In the memeory of his favourite wife,Mumtaz Mahal..";
        contentDiv.appendChild(heading);
        contentDiv.appendChild(content);
        div1.appendChild(contentDiv);
        targetElement.appendChild(popup);

        var containers1 = document.getElementById('food-popup');
        var containers2 = document.getElementById('art-popup');
        var containers3 = document.getElementById('monuments-popup');
        
        containers1.addEventListener('click', function () {
            window.location.href = '/uttar pradesh/food';
        });
        containers2.addEventListener('click', function () {
            window.location.href = '/uttar pradesh/art';
        });
        containers3.addEventListener('click', function () {
            window.location.href = '/uttar pradesh/monuments';
        });

        isElementCreated = true;
    } else {
        if (popup) {
            popup.parentNode.removeChild(popup);
        }
        isElementCreated = false;
        }
});

// statePaths.forEach((path) => {
//     const category = path.getAttribute('data-category');
//     const stateName = path.getAttribute('data-state'); // Add a data attribute for the state name
//     path.addEventListener('click', () => {
//         // ...

//         // Redirect to the custom route for the selected category
//         window.location.href = `/${assam}/${food}`;
//     });
// });