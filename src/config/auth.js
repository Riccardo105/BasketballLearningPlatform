
const jwt = require("jsonwebtoken");

const authSessionToken = (req, res, next) => {
    const token = req.session.token;
    console.log(token)

    if (!token) {
        return res.status(401).send({ message: "Unauthorised: token not found."});
    }

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