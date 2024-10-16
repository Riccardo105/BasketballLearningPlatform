const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); // creates session token upon log-in
const bcrypt = require("bcryptjs"); // handles password encryption process
const secretKey = process.env.JWT_KEY;
const OngoingSession = require("../models/sessionHistoryModel");
const CompletedSession = require("../models/sessionHistoryModel");


// Sign-up
const userSignup = async (req, res) => {
    try{
        const { userName, email, password} = req.body;
        // validation
        if (!userName || !email || !password) {
            return res.status(400).json({message: "All field are reuqired"});
        };

        // check for existing user (unique email)
        const emailIsUsed = await User.findOne({email});
        if (emailIsUsed) {
            return res.status(400).json({message: "email is alread in use"});
        };

        // create new instance
        const newUser = new User({
            userName,
            email,
            password: bcrypt.hashSync(req.body.password, 5) // second parmaters states num or salt rounds
        });

        // save user
        await newUser.save();

        // a ongoing and completed session is created for history management purposes
        const ongoingSession = new OngoingSession({userID: newUser._id});
        const completedSession = new CompletedSession({userID: newUser._id});

        await ongoingSession.save();
        await completedSession.save();
        
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
            userName: req.body.userName
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

        const token = jwt.sign({id: user._id},
                                secretKey,
                                {
                                algorithm: 'HS256',
                                expiresIn: '24h',  
                                });

        req.session.token = token;
        console.log(req.session.token)
        return res.status(200).send({
            id: user._id,
            username: user.userName,
            email: user.email,

        });

    }
    catch (error) {
        return res.status(500).send({message: error.message});
    };    
};

// log-out

const userSignout = async (req, res) => {
    try {
       req.session = null;
       return res.status(200).send({ message: "You have been signed out."}); 
    }
    catch (error) {
        this.next(error);
    }
};

module.exports = {userSignup, userLogin, userSignout};