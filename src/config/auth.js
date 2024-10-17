
const jwt = require("jsonwebtoken");

const authSessionToken = (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        return res.statust(401).send({ message: "Unauthorised: Not token found."});
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send({message: "Unauthorised: Failed to authenticate"})
        }
        req.userId = decoded.id;
        next();
    });

};

module.exports = authSessionToken