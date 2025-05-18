const Screen = require("../models/Screen")

const getScreens = async (req, res) => {
    try {
        const result = await Screen.find({});
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
    }
}

module.exports = getScreens;