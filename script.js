let modal = document.getElementById("modal");

function toggleThem() {

}

function toggleFavorites() {
    if (modal.style.display === "none" || modal.style.display === "") {
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }
    console.log("clicked");
}

function navigate() {
    console.log("clicked");
    window.location.href = "details.html";
}