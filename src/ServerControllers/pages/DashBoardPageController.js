const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../../models/blackListedTokenModel");

// user dashboard route: DINAMIC redirected here if successfull login
// username is taken from cookie payload
const dashboardPage = (req, res)=> {
    const token = req.cookies['token'];

    // Check if the token exists
    if (!token) {
        return res.redirect("/login"); // No token, redirect to login
    }

      // Verify the JWT token with a callback
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            console.error("Token verification failed:", err);
            return res.redirect("/login"); // Token verification failed, redirect to login
        }

        // Token is valid, check if it's blacklisted
        BlacklistedToken.findOne({ token }).then(blacklistedToken => {
            if (blacklistedToken) {
                return res.redirect("/login"); // Token is blacklisted
            }

            // Render the dashboard page with user information
            res.render("pages/dashboard", { title: `dashboard/${decoded.userName}`, userName: decoded.userName });
        }).catch(err => {
            console.error("Error checking blacklist:", err);
            return res.redirect("/login"); // Error occurred while checking blacklist
        });
    });
};

module.exports = dashboardPage