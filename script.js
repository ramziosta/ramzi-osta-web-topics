let modal = document.getElementById("modal");

function toggleThem() {

}

function toggleFavorites() {
    modal.style.display === "none" || modal.style.display === "" ?
        modal.style.display = "block":
        modal.style.display = "none";
}

function navigate() {
    console.log("clicked");
    window.location.href = "details.html";
}