const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../../models/blackListedTokenModel");
const { getCompletedSession } = require("../api/SessionHistoryApiController");

// user dashboard route: DINAMIC redirected here if successfull login
// username is taken from cookie payload
const dashboardPage = (req, res)=> {
    const token = req.cookies['token'];

    // Check if the token exists
    if (!token) {
        return res.redirect("/login"); // No token, redirect to login
    }

      // Verify the JWT token with a callback
      jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
        if (err) {
            console.error("Token verification failed:", err);
            return res.redirect("/login"); // Token verification failed, redirect to login
        }

        // Token is valid, check if it's blacklisted
        try {
            // Check if the token is blacklisted
            const blacklistedToken = await BlacklistedToken.findOne({ token });
            if (blacklistedToken) {
                return res.redirect("/login"); // Token is blacklisted
            }


            // req.body = {...req.body, userId: decoded.id}
            // const ongoingData = await getOngoingSession(req, res);
            // const completedData = await getCompletedSession(req, res);

            

            // Render the dashboard page with user information
            res.render("pages/dashboard", { title: `dashboard/${decoded.username}`,
                                            username: decoded.username,
                                           
                                            });

        } catch(error) {
            console.error("Error checking blacklist:", err);
            return res.redirect("/login"); // Error occurred while checking blacklist
        };
    });
};

module.exports = dashboardPage