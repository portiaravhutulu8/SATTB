const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken')
const ResetToken = require('../models/resetToken');
const { isValidObjectId } = require("mongoose");
const { sendError } = require("../utils/helper");
const resetToken = require('../models/resetToken');


exports.isResetTokenValid = async (req, res, next) => {
    const {token, id} = req.query
    if(!token || !id) return sendError(res, 'Invalid request!');

    if(!isValidObjectId(id)) return sendError(res, 'Invalid user!');

    const user = await User.findById(id)
    if(!user) return sendError(res, 'User not found!');

    const resetToken = await ResetToken.findOne({owner: user._id})
    if(!resetToken) return sendError(res, 'Reset token not found!');

    const isValid = await resetToken.compareToken(token)
    if(!isValid) return sendError(res, 'Reset token is invalid!');

    req.user = user
    next()
};

exports.updateUserProfile = asyncHandler( async (req, res) => {
    //let id = req.user._id;

    const user = await User.findById('63508dea4da127474c020bf3');

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.age = req.body.age || user.age;
        user.gender = req.body.gender || user.gender;
        user.address = req.body.address || user.address;
        user.pic = req.body.pic || user.pic;

        if(req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id:updatedUser.id,
            name:updatedUser.name,
            email:updatedUser.email,
            age:updatedUser.age,
            gender:updatedUser.gender,
            address:updatedUser.address,
            pic:updatedUser.pic,
            //token:generateToken(updatedUser._id),
        });
    }
    else {
        res.status(404);
        throw new Error("User not found!");
    }
});
