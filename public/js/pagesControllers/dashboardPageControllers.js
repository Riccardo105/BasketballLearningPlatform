
// profile button (in burger menu) redirects to log-in page if not logged in
document.querySelectorAll(".profileBtn").forEach(element => {
    element.addEventListener("click", function(){
        window.location.href = "/dashboard" //if logged in loads profile page
    })    
});

//sign out button 
document.querySelectorAll(".signoutBtn").forEach(element => {
    element.addEventListener("click", async function() {
        try {
            const response = await fetch("/users/logout", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (response.ok) {
                // Handle success (redirect to login page)
                window.location.href = "/login";
            } else {
                console.error("Sign out failed:", data.message);
            }
        } catch (error) {
            console.error("Request failed", error);
        }
    });
});