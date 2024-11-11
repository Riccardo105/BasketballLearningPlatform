
// exercise button event listener
document.querySelectorAll(".exercisesBtn").forEach(element => {
    element.addEventListener("click", function() {
        window.location.href = "/exercises"; // Navigates to the exercises page
    });
});