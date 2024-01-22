const express = require('express');
const { addMessage, getAllMessage } = require('../controllers/messagesControllers');

const messagesRouter = express.Router();

messagesRouter.post("/addMessage", addMessage);
messagesRouter.post("/getMessages", getAllMessage);

module.exports = {
    messagesRouter
}