document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("container");

    // Fetch data from your backend API (replace 'your-api-endpoint' with the actual endpoint)
    fetch("food.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("card");

                const cardImage = document.createElement("div");
                cardImage.classList.add("cardimg");
                cardImage.style.backgroundImage = `url('${item.link}')`;

                const link = document.createElement("a");
                link.href = item.link;
                link.target = "_blank";

                const h2 = document.createElement("h2");
                h2.textContent = item.name;

                link.appendChild(h2);
                card.appendChild(cardImage);
                card.appendChild(link);
                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching data from API: " + error));
});
