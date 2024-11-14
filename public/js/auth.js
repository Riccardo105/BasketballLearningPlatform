
// in here we check if there is a JWT in  the session (which means the user is logged in)
// for certain buttons the page output is determinated by being or not logged in 

// check 
function authenticateUser() {
    // Get the token from the cookie
    const token = getCookie("token");

    if (token) {
        // Optionally, verify the token with the server
        verifyToken(token);
    } else {
        // Redirect to login if no token
        window.location.href = "/login";
    }
}

async function verifyToken(token) {
    try {
        const response = await fetch("/verifyToken", {  // Assuming you have a verifyToken endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`  // Send token in the header
            }
        });

        if (response.ok) {
            // Token is valid, redirect to dashboard
            window.location.href = "/dashboard";
        } else {
            // Invalid or expired token, redirect to login page
            window.location.href = "/login";
        }
    } catch (error) {
        console.error("Token verification failed", error);
        window.location.href = "/login";
    }
}
