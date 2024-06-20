let modal = document.getElementById("modal");
let body = document.getElementById("body");
let cardDisplay = document.getElementById("card-display");

function toggleTheme() {
    let currentTheme = body.getAttribute('data-theme');
    let newTheme = currentTheme === 'light' || !currentTheme ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);

    console.log("clicked color theme");
}

function toggleFavorites() {
    modal.style.display === "none" || modal.style.display === "" ?
        modal.style.display = "block" :
        modal.style.display = "none";
}

function navigate(card) {
    console.log("clicked");
    window.location.href = "details.html";
}

window.onload = function (data) {
    console.log("loaded");

    let cardDisplay = document.getElementById("card-display");

    data.forEach(item => {
        let card = document.createElement("div");
        let img = document.createElement("img");
        let cardDetails = document.createElement("div");
        let info1 = document.createElement("div");
        let category = document.createElement("p");
        let topic = document.createElement("h4");
        let info2 = document.createElement("div");
        let rating = document.createElement("p");
        let author = document.createElement("p");

        // Set attributes and content
        img.src = `/assets/logos/${item.image}`;
        img.alt = item.topic;
        category.className = "category";
        category.innerText = item.category;
        topic.innerText = item.topic;
        rating.innerText = `⭐⭐⭐️${item.rating}`;
        author.innerHTML = item.name;
        cardDetails.className = "card-details";
        info1.className = "info-1";
        info2.className = "info-2";
        card.className = "card";
        card.onclick = navigate; // Assuming navigate is a defined function
        card.id = item.id;

        // Append child elements
        info1.appendChild(category);
        info1.appendChild(topic);
        info2.appendChild(rating);
        info2.appendChild(author);
        cardDetails.appendChild(info1);
        cardDetails.appendChild(info2);
        card.appendChild(img);
        card.appendChild(cardDetails);
        cardDisplay.appendChild(card);
    });
};

async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        window.onload(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fetch data and trigger onload
fetchData();

document.addEventListener('DOMContentLoaded', () => {
    // Get the ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get('id');

    // Fetch the data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const cardData = data.find(item => item.id === cardId);
            if (cardData) {
                // Display the data on the page
                document.getElementById('card-title').innerText = cardData.topic;
                document.getElementById('card-description').innerText = cardData.description;
                // Continue populating other elements as needed
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});