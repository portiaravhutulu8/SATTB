const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    confirmPassword: String,
    age: Number,
    gender: String,
    address: String
});

UserSchema.pre("save", async function (next){
    if(this.isModified("password")) {
        const hash = await bcrypt.hash(this.password, 8);
        this.password = hash;
    }

    next();
});

UserSchema.methods.comparePassword = async function(password) {
    const result = await bcrypt.compareSync(password, this.password);
    return result;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
