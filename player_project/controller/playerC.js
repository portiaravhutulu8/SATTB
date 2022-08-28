const Player = require("../model/player.js");

const jwt = require('jsonwebtoken');
const { sendError } = require("../utils/helper.js");

exports.createPlayer = async (req, res) => {
    const { firstName, lastName, emailAddress, password, verifyPassword, dateOfBirth } = req.body
    const duplicate = await Player.findOne({ emailAddress });

    if (duplicate) return sendError(res, "this email exists!");//res.status(400).json({ success: false, error: "email exists" });
    const newPlayer = new Player({
        firstName,
        lastName,
        emailAddress,
        password,
        verifyPassword,
        dateOfBirth,
    });
    await newPlayer.save();
    res.send(newPlayer);
};

exports.signin = async (req, res) => {
    const { emailAddress, password } = req.body;
    if (!emailAddress.trim() || !password.trim())
        return sendError(res, "email/password missing");// res.status(400).json({ success: false, error: "email/password missing" });

    const user = await Player.findOne({ emailAddress })
    if (!user) return sendError(res, "User not found"); //res.status(400).json({ success: false, error: "User not found" });

    const match = await user.comparePassword(password)
    if (!match) return sendError(res, "email/password is incorrect"); //res.status(400).json({ success: false, error: "email/password is incorrect" });


    const token = jwt.sign({ playerID: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, user: { name: user.name, email: user.emailAddress, id: user._id, token: token } })

};

