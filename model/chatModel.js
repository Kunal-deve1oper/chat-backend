const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    chatName:{
        type: String,
        trim: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },],
    latestMsg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
})

const Chat = mongoose.model("Chat",chatSchema);

module.exports = Chat;