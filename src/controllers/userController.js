const User = require("../models/userModel")

// create new user
const createUser = async (req, res) => {
    try{
        const { userName, email, password} = req.body;
        // validation
        if (!userName || !email || !password) {
            return res.statur(400).json({message: "All field are reuqired"});
        }

        // check for existing user (unique email)
        const emailIsUsed = await User.findOne({email});
        if (emailIsUsed) {
            return res.status(400).json({message: "email is alread in use"});
        }

        // create new instance
        const newUser = new User({
            userName,
            email,
            password
        });

        // save user
        await newUser.save()

        // final response
        res.status(201).json(newUser);
    } 
    
    catch (error) {
            console.error(error);
            res.status(500).json({message: "Server error while creating user"});
        }
    };

module.exports = {createUser};
