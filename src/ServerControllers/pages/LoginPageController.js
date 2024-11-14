const jwt = require("jsonwebtoken");

// login page Controller
const loginPage = (req, res) => {
    const token = req.cookies['token'];
    
        if (token) {
            // Verify the JWT token
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    console.error("Token verification failed:", err);
                    // If verification fails, render the login page
                    return res.render("pages/login", { title: "login" });
                }
    
                // Token is valid, redirect to dashboard
                return res.redirect("/dashboard");
            });
        } else {
            // No token found, render login page
            res.render("pages/login", { title: "login" });
        }
};


module.exports = loginPage

