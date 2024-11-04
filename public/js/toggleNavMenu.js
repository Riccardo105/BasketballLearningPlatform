
function toggleMenu(menuId) {

    const menu1 = document.getElementById("burgerMenu");
    const menu2 = document.getElementById("profileMenu");

    if (menuId === menu1) {
        menu1.classList.toggle("hidden");
        menu2.classList.add("hidden");
    } else if (menuId === menu2) {
        menu1.classList.add("hidden");
        menu2.classList.toggle("hidden");
    }
}




