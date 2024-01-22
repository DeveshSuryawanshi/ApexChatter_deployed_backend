const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, min: 4, max: 20, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true, min: 8},
    isAvatar: {type: Boolean, default: false},
    avatarImg: {type: String, default: ""}
},{
    versionKey: false
})

const UserModel = mongoose.model("user", userSchema);

module.exports = {
    UserModel
}