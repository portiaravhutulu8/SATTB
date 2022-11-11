const express = require('express');
const router = express.Router();
const { sendError, createRandomBytes } = require("../utils/helper");
const ResetToken = require("../models/resetToken");
const crypto = require('crypto');
const {mailTransport, generatePasswordResetTemplate, generateOTP, plainEmailTemplate} = require("../utils/mail");
const {isValidObjectId} = require("mongoose");
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

//mongodb user model
const User = require('./../models/User');

//password handler
const bcrypt = require('bcrypt');

const { isResetTokenValid } = require('../middlewares/user');
const { updateUserProfile } = require('../middlewares/user');
const {protect} = require('../middlewares/auth');
const Joi = require('joi');

//update profile
router.post('/profile', protect, updateUserProfile, async (req, res) => {
    res.json({success: true});
});

//send password link
router.post('/', async (req,res) => {
    try{
        const emailSchema = Joi.object({
            email: Joi.string().email().required().label("Email")
        });
        const {error} = emailSchema.validate(req.body);
        if(error)
        return res.status(400).send({message: error.details[0].message});

        let user = await User.findOne({ email: req.body.email });
        if(!user)
        return res.status(409).send({message: "User with given email does not exist!"});

        let token = await Token.findOne({userId: user._id});
        if(!token){
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save()
        }

        const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password Reset",url);

        res.status(200).send({message: "password reset link sent to your email account"});

    } catch (error) {
        res.status(500).send({message: "Internal server error!"});
    }
});

//verify url
router.get("/:id/:token", async (req, res) => {
    try{
        const user = await User.findOne({_id: req.params.id});
        if(!user) return res.status(400).send({mesaage: "invalid link"});

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if(!token) return res.status(400).send({mesaage: "invalid link"});
        
        res.status(200).send({message: "Valid url"});
    } catch (error){
        res.status(500).send({message: "Internal server error!"});
    }
});

//reset password
router.post("/:id/:token", async (req,res) => {
    try{
        const passwordSchema = Joi.object({
            password: passwordComplexity().required().label("Password")
        });
        const {error} = passwordSchema.validate(req.body);
        if(error)
        return res.status(400).send({message: error.details[0].message});

        const user = await User.findOne({_id: req.params.id});
        if(!user) return res.status(400).send({mesaage: "invalid link"});

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if(!token) return res.status(400).send({mesaage: "invalid link"});

        if(!user.verfied) user.verified = true;

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        user.password = hashPassword;
        await user.save();
        await token.remove();

        res.status(200).send({message: "Password reset successfully"});

    }catch(error) {
        res.status(500).send({message: "Internal server error!"});
    }
})


//forgot password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    if(!email) return sendError(res, "Please provide a valid email!");

    const user = await User.findOne({email});
    if(!user) return sendError(res, "User not found, invalid request!");

    const token = await ResetToken.findOne({owner: user._id});
    if(token)
    return sendError(
        res,
        "You can only request another one in an hour!"
    );

    const randomBytes = await createRandomBytes();
    const resetToken = new ResetToken({ owner: user._id, token: randomBytes });
    await resetToken.save();

    mailTransport().sendMail({
        from: "security@email.com",
        to: user.email,
        subject: "Password Reset",
        html: generatePasswordResetTemplate(
            `http://localhost:3000/user/reset-password?token=${randomBytes}&id=${user._id}`
        ),
    });

    res.json({
        success: true,
        message: 'Password reset link has been sent to your email.'
    })
});

//Reset Password
router.post('/reset-password/:token/:id', isResetTokenValid, async (req, res) => {
    const {password} = req.body;
    const {id, token} = req.params;
    
    const user = await User.findById(req.user._id);
    if(!user) return sendError(res, 'User not found!');

    const isSamePassword = await user.comparePassword(password)
    if(!isSamePassword) return sendError(res, 'New password must be different!');

    if(password.trim().length < 8 || password.trim().length > 20)
    return sendError(res, 'Password must be 8 to 20 characters long!');

    user.password = password.trim();
    await user.save();

    await ResetToken.findOneAndDelete({owner: user._id})

    mailTransport().sendMail({
        from: "security@email.com",
        to: user.email,
        subject: "Password Reset successful",
        html: plainEmailTemplate("Password Reset Successfully",
        "now you can login with new password!"),
    });

    res.json({ success: true, message:  "Password Reset successful" });

});

router.get("/verify-token", isResetTokenValid, (req, res) => {
    res.json({success: true});
});
//SignUp 
router.post('/signup', async (req, res) => {
    let {name, email, password, confirmPassword, age, gender, address} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();
    age = age.trim();
    gender = gender.trim();
    address = address.trim();

    if(name == "" || email == "" || password == "" || confirmPassword == "" || age == "" || gender == "" || address == "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Invalid email entered"
        })
    } else if (!/^[0-9 ]*$/.test(age)){
        res.json({
            status: "FAILED",
            message: "Invalid age entered"
        })
    } else if (!/^[a-zA-Z ]*$/.test(gender)){
        res.json({
            status: "FAILED",
            message: "Invalid gender entered"
        })
    } else if (!/^[a-zA-Z0-9 ]*$/.test(address)){
        res.json({
            status: "FAILED",
            message: "Invalid address entered"
        })
    } else if (password.length < 8){
        res.json({
            status: "FAILED",
            message: "Password is too short!"
        })
    } else if (confirmPassword.length < 8){
        res.json({
            status: "FAILED",
            message: "Password is too short!"
        })
    } else {
        //checking if user already exists
        const user = await User.findOne({email});
                //A user already exists
                if(user) return sendError(res, "User with the provided email already exists" );

                //try to create new user

                //password handling
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(async hashedPassword => {
                    const newUser = new User ({
                        name,
                        email,
                        password: hashedPassword,
                        confirmPassword: hashedPassword,
                        age,
                        gender,
                        address,
                    });

                    await newUser.save();
                    res.send(newUser);
                    
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occured while checking for existing user!"
            })
        })
    }
})

//SignIn
router.post('/signin', async (req, res) => {
    let {email, password} = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty credentials supplied"
        })
    } else {
        //check if user exist
        User.find({email})
        .then(data => {
            if (data.length) {
                //user exists
                const token = jwt.sign({userId: data._id}, process.env.JWT_SECRET,{
                    expiresIn: "1d",
                });
                const hashedPassword =data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if(result) {
                        //password match
                        res.json({
                            status: "SUCCESS",
                            message: "Signin successful",
                            data: data,
                            token: token
                        })
                    } else {
                        res.json({
                            status: "FAILED",
                            message: "Invalid password entered!"
                        })
                    }
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while comparing passwords"
                    })
                })
            } else {
                res.json({
                    status: "FAILED",
                    message: "Invalid credentials entered!"
                })
            }
        })
        .catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occured while checking for existing user"
            })
        })
    }
})

module.exports = router;
