
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


// show credentials menu and change button
document.getElementById("credentialsPlus").addEventListener("click", async function() {
    credentialsDiv = document.getElementById("credentialsDiv")

    credentialsDiv.classList.toggle("hidden");
    credentialsPlus.classList.add("hidden");
    if (credentialsMinus) {
        credentialsMinus.classList.remove("hidden"); 
    }      
});

// hide credentials menu and change button
document.getElementById("credentialsMinus").addEventListener("click", async function() {
    credentialsDiv = document.getElementById("credentialsDiv")

    credentialsDiv.classList.add("hidden");
    credentialsMinus.classList.add("hidden");
     if (credentialsPlus) {
        credentialsPlus.classList.remove("hidden");
    }
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



// show ongoing History menu and change button
document.getElementById("ongoingPlus").addEventListener("click", async function() {
    credentialsDiv = document.getElementById("credentialsDiv")

    ongoingDiv.classList.toggle("hidden");
    ongoingPlus.classList.add("hidden");
    if (ongoingMinus) {
        ongoingMinus.classList.remove("hidden"); 
    }   
});

// hide ongoing History menu and change button
document.getElementById("ongoingMinus").addEventListener("click", async function() {
    credentialsDiv = document.getElementById("credentialsDiv")

    ongoingDiv.classList.add("hidden");
    ongoingMinus.classList.add("hidden");
    if (ongoingPlus) {
        ongoingPlus.classList.remove("hidden"); 
    }  
});

// show completed History menu and change button
document.getElementById("completedPlus").addEventListener("click", async function() {
    credentialsDiv = document.getElementById("credentialsDiv")

    completedDiv.classList.toggle("hidden");
    completedPlus.classList.add("hidden");
    if (completedMinus) {
        completedMinus.classList.remove("hidden"); 
    }   
});

// hide completed History menu and change button
document.getElementById("completedMinus").addEventListener("click", async function() {
    credentialsDiv = document.getElementById("credentialsDiv")

    completedDiv.classList.add("hidden");
    completedMinus.classList.add("hidden");
    if (completedPlus) {
        completedPlus.classList.remove("hidden"); 
    }  
});


// bind complete buttons to history updating function (same structure as completedbutton in exercise page)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".completedBtns").forEach(element => {
        element.addEventListener("click", async function() {
            const exerciseId = this.getAttribute("data-id");
            

            console.log( "dashboard button:", exerciseId)
        
        // technically to access this call there have been already several checks on the user being logged in 
        // but better safe than sorry.
        // first the exercise is removed from the ongoing history
            fetch("http://localhost:5000/sessionHistory/removeOngoingEntry", {
                method: 'POST',
                body: JSON.stringify({ exerciseId}),
                headers: { 'Content-Type': 'application/json'},
                credentials: "include"
            }).then(response => {
                if (!response.ok) {
                    // If the response status is not OK (200), log the status and throw an error
                    console.error('Error: ', response.status, response.statusText);
                    
                }
                return response.json();

            }).catch(error => {
                console.error('Error calling the add-entry API:', error);
            });

        // then the exercise is added to the completed session
        
            fetch("http://localhost:5000/sessionHistory/addCompletedEntry", {
                method: 'POST',
                body: JSON.stringify({ exerciseId}),
                headers: { 'Content-Type': 'application/json'},
                credentials: "include"
            }).then(response => {
                if (!response.ok) {
                    // If the response status is not OK (200), log the status and throw an error
                    console.error('Error: ', response.status, response.statusText);
                    
                }
                return response.json();

            }).then(data => {
                // Reload the page or redirect
                window.location.reload(); // Reloads the current page
                // OR redirect to another page
                // window.location.href = "/dashboard"; // Replace with your dashboard route
            }).catch(error => {
                console.error('Error calling the add-entry API:', error);
            });
        });
    });
})