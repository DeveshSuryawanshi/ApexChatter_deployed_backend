const { MessageModel } = require("../models/messageModel");

module.exports.addMessage = async(req, res, next) =>{
    try {
        const {from, to, message} = req.body;
        const data = await MessageModel.create({
            message: {text: message},
            users: [from, to],
            sender: from
        })
        data.save();
        if(data){
            return res.status(200).json({msg: "Message sent successfully."})
        }else{
            return res.status(400).json({msg: "Failed to sent message."})
        }
    } catch (error) {
        next(error);
    }
}

module.exports.getAllMessage = async(req, res, next) =>{
    try {
        const {from, to} = req.body;
        const messages = await MessageModel.find({
            users:{
                $all: [from, to]
            }
        }).sort({updatedAt: 1});
        const projectedMessages = messages.map((msg)=> {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        })
        return res.status(200).json(projectedMessages);
    } catch (error) {
        next(error);
    }
}