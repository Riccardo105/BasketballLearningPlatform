const User = require("../../models/userModel");
const jwt = require("jsonwebtoken"); // creates session token upon log-in
const bcrypt = require("bcryptjs"); // handles password encryption process
const {OngoingSession, CompletedSession} = require("../../models/sessionHistoryModel");
const BlacklistedToken = require("../../models/blackListedTokenModel");




// Sign-up
const userSignup = async (req, res) => {
    try{
        const { username, email, password} = req.body;
        // validation
        if (!username || !email || !password) {
            return res.status(400).json({message: "All field are reuqired"});
        };

        // check for existing user (unique email)
        const emailIsUsed = await User.findOne({email});
        if (emailIsUsed) {
            return res.status(400).json({message: "email is alread in use"});
        };

        // create new instance
        const newUser = new User({
            username,
            email,
            password: bcrypt.hashSync(req.body.password, 5) // second parmaters states num or salt rounds
        });


        // a ongoing and completed session is created for history management purposes
        const ongoingSession = new OngoingSession({userID: newUser._id});
        const completedSession = new CompletedSession({userID: newUser._id});

        await ongoingSession.save();
        await completedSession.save();
        await newUser.save();
        
        // final response
        res.status(201).json(newUser);
    } 
    
    catch (error) {
            console.error(error);
            res.status(500).json({message: "Server error while creating user"});
        }
    };

// log-in 

const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(404).send({message: "User not found."});
        };

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({message: "Invalid Password"});
        }

        const token = jwt.sign( {id: user._id,
                                username: user.username
                                },
                                process.env.JWT_KEY,
                                {
                                algorithm: 'HS256',
                                expiresIn: '1h',  
                                });
    
        // Set the JWT as an httpOnly cookie
        res.cookie('token', token, { 
            httpOnly: true, 
            maxAge:  60 * 60 * 1000 // 1 hours in milliseconds 
});
        return res.status(200).send({  message: "Login successful", username: user.userName });

    }
    catch (error) {
        return res.status(500).send({message: error.message});
    };    
};

// log-out

const userSignout = async (req, res) => {
    const token = req.cookies['token']; 

    if (token) {
        try {
            // Check if the token is already blacklisted
            const existingToken = await BlacklistedToken.findOne({ token });

            if (existingToken) {
                console.log('Token is already blacklisted.');
            } else {
                // Add the token to the blacklist
                const blacklistedToken = new BlacklistedToken({ token });
                await blacklistedToken.save();
                console.log('Token added to blacklist:', token);
            }

            // Clear the session (log out the user)
            res.clearCookie('token', {path: "/"});
            return res.status(200).send({ message: "You have been signed out." });

        } catch (error) {
            console.error('Error blacklisting token:', error);
            return res.status(500).json({ message: "Error while signing out." });
        }

    } else {
        return res.status(500).json({ message: "No token found to sign out." });
    }
};

module.exports = {userSignup, userLogin, userSignout};


