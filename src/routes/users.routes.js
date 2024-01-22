const express = require("express");
const { register, login, setAvatar, getContacts } = require("../controllers/usersControllers");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/setAvatar/:id", setAvatar);
userRouter.get("/allContacts/:id", getContacts);

module.exports = {
    userRouter
}

