
document.addEventListener("DOMContentLoaded", function () {
    function toggleMenu(menuId) {

        const menu1 = document.getElementById("burgerMenu");
        const menu2 = document.getElementById("profileMenu");

        if (menuId === "burgerMenu") {
            menu1.classList.toggle("hidden");
            menu2.classList.add("hidden");
        } else if (menuId === "profileMenu") {
            menu1.classList.add("hidden");
            menu2.classList.toggle("hidden");
        }
    };

    const burgerIcon = document.querySelector(".fa-bars");
    const profileIcon = document.querySelector(".fa-user");

    burgerIcon.addEventListener("click", function () {
        toggleMenu("burgerMenu");
    });

    profileIcon.addEventListener("click", function () {
        toggleMenu("profileMenu");
    });
});



