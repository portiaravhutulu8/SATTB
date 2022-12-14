const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const playerSchema = new mongoose.Schema(
    {
        firstName:
        {
            type: String,
            required: true
        },
        lastName:
        {
            type: String,
            required: true
        },
        emailAddress:
        {
            type: String,
            required: true
        },
        password:
        {
            type: String,
            required: true
        },
        verifyPassword:
        {
            type: String,
            required: true
        },
        age:
        {
            type: String,
            required: true
        },
        gender:
        {
            type: String,
            required: true
        },
        province:
        {
            type: String,
            required: true
        }
    });
//function (next)
playerSchema.pre('save', async function (next) {//encrypting the user password using Bcrypt method.

    if (this.isModified('password')) {
        const hash = await bcrypt.hash(this.password, 8)
        this.password = hash
    }
    next();


});

playerSchema.methods.comparePassword = async function (password) { //comparing user passwords when signing in
    const result = await bcrypt.compareSync(password, this.password);
    return result;
};

module.exports = mongoose.model("Player", playerSchema);