let modal = document.getElementById("modal");
let body = document.getElementById("body");

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
    window.location.href = `details.html?id=${card.id}`;
    localStorage.setItem("cardId", card.id);
}

async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        console.log(data);
        localStorage.setItem("data", JSON.stringify(data)); // Ensure data is stored as a string
        displayCards(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayCards(data) {
    let cardDisplay = document.getElementById("card-display");

    if (cardDisplay && Array.isArray(data)) {
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

            // Create star icons for full star and half star
            const starIcon = document.createElement("ion-icon");
            starIcon.setAttribute("name", "star");
            starIcon.style.color = "gold";
            const halfStarIcon = document.createElement("ion-icon");
            halfStarIcon.setAttribute("name", "star-half");
            halfStarIcon.style.color = "gold";

            // Set attributes and content
            img.src = `https://ramziosta.github.io/ramzi-osta-web-topics/assets/logos/${item.image}`;
            img.alt = item.topic;
            img.className = "card-img";
            category.className = "category";
            category.style.fontSize = "10px";
            category.innerText = item.category;
            topic.innerText = item.topic;

            // star rating calculation
            if (item.rating) {
                let fullStars = Math.floor(item.rating);
                let halfStars = item.rating - fullStars;
                for (let i = 0; i < fullStars; i++) {
                    const star = starIcon.cloneNode(true);
                    rating.appendChild(star);
                }
                if (halfStars > 0) {
                    rating.appendChild(halfStarIcon.cloneNode(true));
                }
            }

            author.innerHTML = item.name;
            cardDetails.className = "card-details";
            info1.className = "info-1";
            info2.className = "info-2";
            card.className = "card";
            card.onclick = () => navigate(item); // Updated navigate call
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
    }
}

// Fetch data and trigger display
fetchData();

document.addEventListener('DOMContentLoaded', () => {
    // Get the ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get('id');

    console.log("Card ID from URL:", cardId); // Debugging 🐞
    let localStorageCardId = localStorage.getItem("cardId");
    console.log("Card Id from Local storage:", localStorageCardId); // Debugging 🐞
    // Fetch the data from localStorage
    const data = JSON.parse(localStorage.getItem("data"));

    console.log("Data from localStorage:", data); // Debugging 🐞

    if (data && Array.isArray(data)) {
        const cardData = data.find(item => cardId === cardId);

        console.log("Card Data:", cardData); // Debugging 🐞

        // Display the card details
        if (cardData) {
            let cardElements = {
                detailsImage: document.getElementById("card-details-image"),
                detailsCategory: document.getElementById("details-category"),
                detailsTopic: document.getElementById("details-topic"),
                detailsRating: document.getElementById("details-rating"),
                detailsDescription: document.getElementById("details-description"),
                subTopic: document.getElementById("sub-topic"),
                subTopicsList: document.getElementById("checklist")
            };

            cardElements.detailsImage.alt = cardData.topic;
            cardElements.detailsImage.src = `https://ramziosta.github.io/ramzi-osta-web-topics/assets/logos/${cardData.image}`;
            cardElements.detailsCategory.innerText = cardData.category;
            cardElements.detailsTopic.innerText = cardData.topic;
            cardElements.detailsDescription.innerText = cardData.description;

            // Clear existing rating and append star icons
            cardElements.detailsRating.innerHTML = "";
            let fullStars = Math.floor(cardData.rating);
            let halfStars = cardData.rating - fullStars;
            const starIcon = document.createElement("ion-icon");
            starIcon.setAttribute("name", "star");
            starIcon.style.color = "gold";
            const halfStarIcon = document.createElement("ion-icon");
            halfStarIcon.setAttribute("name", "star-half");
            halfStarIcon.style.color = "gold";
            if (cardData.rating) {
                for (let i = 0; i < fullStars; i++) {
                    cardElements.detailsRating.appendChild(starIcon.cloneNode(true));
                }
                if (halfStars > 0) {
                    cardElements.detailsRating.appendChild(halfStarIcon.cloneNode(true));
                }
            }

            // Clear any existing subtopics
            cardElements.subTopicsList.innerHTML = "";

            // Append new subtopics
            cardData.subtopics.forEach(subtopic => {
                let li = document.createElement("li");

                // Create the ion-icon element
                let checkmark = document.createElement("ion-icon");
                checkmark.setAttribute("name", "checkmark-circle-outline");
                checkmark.style.color = "var(--brand-secondary)";

                // Append the checkmark and subtopic text to the li element
                li.appendChild(checkmark);
                li.appendChild(document.createTextNode(subtopic));

                // Append the li element to the subTopicsList
                cardElements.subTopicsList.appendChild(li);
            });
        } else {
            console.error('No card data found with the given ID');
        }
    } else {
        console.error('No data found in localStorage');
    }
});
function addToFavorites(card) {
    const favoriteTopics = [];
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
        favoriteTopics.push(...JSON.parse(favorites));
    }
    favoriteTopics.push(card);
    localStorage.setItem('favorites', JSON.stringify(favoriteTopics));
    console.log("Card ID:", card.id); // Debugging 🐞
}