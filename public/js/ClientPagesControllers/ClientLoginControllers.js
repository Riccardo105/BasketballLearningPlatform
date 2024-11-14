// event listener to send login data to server and handle responde
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loginForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        try{ 
            console.log("Attempting to fetch...")
            const response = await fetch("/users/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({email, password})
            });

            const data = await response.json();

            // search for the signoutBtn in the profileMenu partial and toggles hidden if successfully logged in
            signoutBtn = document.getElementById("signoutBtn")

            if (response.ok) {
                window.location.href = `/dashboard?username=${data.username}`
                signoutBtn.classList.toggle("hidden")
                
            } else {
                loginMessage.textContent = data.message || "An error as occured";
                loginMessage.style.color = "red";
                

                
            } 
        } catch (error){
            console.error("Request failed", error);
            loginMessage.textContent = "An error occurred during login.";
            loginMessage.style.color = "red"
        }
    });
});