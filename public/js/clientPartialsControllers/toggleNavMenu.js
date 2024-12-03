
document.addEventListener("DOMContentLoaded", function () {
    function toggleMenu(menuId) {

        const menu1 = document.getElementById("burgerMenu");
        const menu2 = document.getElementById("profileMenu");

        if (menuId === "burgerMenu") {
            menu1.classList.toggle("hidden");
            burgerIcon.classList.toggle("bg-slate-600");
            menu2.classList.add("hidden");
            if (profileIcon.classList.contains("bg-slate-600")) {
                profileIcon.classList.toggle("bg-slate-600")
            };
        } else if (menuId === "profileMenu") {
            menu1.classList.add("hidden");
            profileIcon.classList.toggle("bg-slate-600");
            menu2.classList.toggle("hidden");
            if (burgerIcon.classList.contains("bg-slate-600")) {
                burgerIcon.classList.toggle("bg-slate-600")
            };
        }
    };

    const burgerIcon = document.querySelector(".fa-bars");
    const profileIcon = document.querySelector(".fa-user");

    
});





