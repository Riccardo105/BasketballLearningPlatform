
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


// show credentials menu
document.querySelectorAll(".fa-plus").forEach(plusIcon => {
    plusIcon.addEventListener("click", async function() {
        credentialsDiv = document.getElementById("credentialsDiv")
        minusIcon = this.nextElementSibling

        credentialsDiv.classList.toggle("hidden");
        plusIcon.classList.add("hidden");
        if (minusIcon) {
            minusIcon.classList.remove("hidden"); 
        }
        
    })
});

// hide credentials menu
document.querySelectorAll(".fa-minus").forEach(minusIcon => {
    minusIcon.addEventListener("click", async function() {
        credentialsDiv = document.getElementById("credentialsDiv")
        plusIcon = this.previousElementSibling

        credentialsDiv.classList.add("hidden");
        minusIcon.classList.add("hidden");
        if (plusIcon) {
            plusIcon.classList.remove("hidden");
        }
    })
});


// submit credentials update form
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("updateCredsForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form)
        
        // preparing the payload to be sent off to server
        const payload = {};
        for (const [key, value] of formData.entries()) {
            // add to payload if there's a value, if not set to null
            payload[key] = value.trim() ? value.trim() : null;
        }
        console.log(payload)

        try {
            const response = await fetch("/users/updateCred", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            const result = await response.json();

            if (response.ok) {
    
                credentialsMessage.textContent = result.message || "Credentials update successful";
                credentialsMessage.style.color = "green"
            } else {
                res.status(401)
                credentialsMessage.textContent = result.message || "Error while updating credentials";
                credentialsMessage.style.color = "red"
            }

        } catch (error) {
            console.error("request failed", error);
             credentialsMessage.textContent = "a server error has occured";
            credentialsMessage.style.color = "red"
        }
    });
});
