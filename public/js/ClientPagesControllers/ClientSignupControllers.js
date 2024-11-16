// event listener to send signup data to server and handle response

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("signupForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = event.target.userName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        try{ 
            console.log("Attempting to fetch...")
            const response = await fetch("/users/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({username, email, password})
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = `/dashboard?username=${username}`
                
                
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