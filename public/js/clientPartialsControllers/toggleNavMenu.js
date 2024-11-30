
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

    function enableIcons() {
        burgerIcon.classList.remove("pointer-events-none", "opacity-50");  // Enable interaction
        profileIcon.classList.remove("pointer-events-none", "opacity-50"); // Enable interaction
    
        // Add event listeners for online state
        burgerIcon.addEventListener("click", function () {
            toggleMenu("burgerMenu");
        });
    
        profileIcon.addEventListener("click", function () {
            toggleMenu("profileMenu");
        });
    }
    
    function disableIcons() {
        burgerIcon.classList.add("pointer-events-none", "opacity-50");  // Disable interaction
        profileIcon.classList.add("pointer-events-none", "opacity-50"); // Disable interaction
    }
    
    // Check the initial online status
    if (!navigator.onLine) {
        disableIcons();
        console.log("NavMenu detected: Offline");
    } else {
        enableIcons();
        console.log("NavMenu detected: Online");
    }
    
    // Listen for online/offline events to update the state dynamically
    window.addEventListener('online', () => {
        console.log("NavMenu detected: Online");
        enableIcons();
    });
    
    window.addEventListener('offline', () => {
        disableIcons();
        
    });

    
});





