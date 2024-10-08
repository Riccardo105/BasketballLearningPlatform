const History = requrie("../models/historyModel")

// POST
const createHistroy = async (req, res) => {
    try {
        const {referenceType, referenceID, status} = req.body;
        // validation 
        if (!referenceType || !referenceID || !stauts) {
        return res.status(400).json({message: "All fields are requried"})
        }

        // create new instance
        const newHistory = new History({
        referenceType,
        referenceID,
        status

        });

        await newHistory.save();

        res.status(201).json(newHistory)
    }

    catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error while creating history"})
    }

    
    };

    MediaSourceHandle.exports = {createHistroy};