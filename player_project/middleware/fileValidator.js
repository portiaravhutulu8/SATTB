const { check, validationResult } = require("express-validator");


exports.validateUser =
    [
        check('firstName').trim()
            .not()
            .isEmpty()
            .withMessage('name is missing')
            .isLength({ min: 3, max: 20 })
            .withMessage('name is too long'),
        check('emailAddress').normalizeEmail().isEmail().withMessage("Email is invalid!"),
        check('password').not().isEmpty().withMessage('Password can not be empty').isLength({ min: 8, max: 15 })
            .withMessage('password needs to be between 8 to 15 characters'),
        check('verifyPassword').not().isEmpty().custom(async (verifyPassword, { res, req }) => {
            const password = req.body.password


            if (password !== verifyPassword)
                throw new Error("Passwords are not the same");


            

        })//.withMessage('passwords are not the same')

    ];

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if (!error.length) return next();
    res.status(400).json({ success: false, error: error[0].msg })
};