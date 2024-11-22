
const jwt = require("jsonwebtoken");

const authSessionToken = (req, res, next) => {
    let token = req.body.token;

    // If no token in body, check in cookies
    if (!token) {
        token = req.cookies?.token; // Optional chaining ensures no error if cookies is undefined
    };

    console.log("Token from auth middleware:", token);

    if (!token) {
        return res.status(401).send({ message: "Unauthorised: token not found."});
    };

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send({message: "Unauthorised: Failed to authenticate"})
        }
        req.userId = decoded.id;
        req.userName = decoded.userName

        next();
    });

};

module.exports = authSessionToken