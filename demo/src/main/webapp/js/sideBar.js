
function hideSidebar() {
    var toHide = document.getElementById("jumbotron");
    toHide.style.display = "none";

    var toDisplay = document.getElementById("maximise");
    toDisplay.style.display = "block";
}


function displaySidebar() {
    var toHide = document.getElementById("maximise");
    toHide.style.display = "none";

    var toDisplay = document.getElementById("jumbotron");
    toDisplay.style.display = "block";
}