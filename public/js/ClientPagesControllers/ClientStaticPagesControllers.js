// home button (in burger menu) to home page
document.querySelectorAll(".homeBtn").forEach(element => {
    element.addEventListener("click", function() {
        window.location.href = "/home"; // Navigates to the home page
    });
});

// login button (in burger menu/ and any other same class buttona) to login page
document.querySelectorAll(".loginBtn").forEach(element => {
    element.addEventListener("click", function() {
        window.location.href = "/login"; // Navigates to the login page
    });
});

// signup button to signup page
document.querySelectorAll(".signupBtn").forEach(element => {
    element.addEventListener("click", function() {
        window.location.href = "/signup"; // Navigates to the signup page
    });
});

//offline page button to homepage
document.querySelectorAll(".offlineBtn").forEach(element => {
    element.addEventListener("click", function() {
        window.location.href = "/home"; // sends back to home page
    });
});