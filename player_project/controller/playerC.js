const Player = require('../model/player');
exports.createPlayer = async (req, res) => {
    const { firstName, lastName, emailAddress, password,verifyPassword, dateOfBirth } = req.body
    const user=await Player.findOne({emailAddress});

    if(user) res.status(400).json({success: false, error: "email exists"})
    const newPlayer = new Player
        ({
            firstName,
            lastName,
            emailAddress,
            password,
            verifyPassword,
            dateOfBirth,
        });

    await newPlayer.save();
    res.send(newPlayer) //This is the long way use app.use
};