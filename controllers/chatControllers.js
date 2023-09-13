const Chat = require("../model/chatModel");

const createChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(401).send({ msg: "no user id found" });
    return;
  }
  try {
    let isChat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMsg");

    if (isChat.length > 0) {
      res.status(201).json(isChat[0]);
    } else {
      let newChat = {
        chatName: "Sender",
        users: [req.user._id, userId],
      };

      try {
        const createdChat = await Chat.create(newChat);

        const fullChat = await Chat.findOne({ _id: createdChat.id }).populate(
          "users",
          "-password"
        );

        res.status(201).json(fullChat);
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};


/**api/chats */

const fetchChats = async (req, res) => {
  try {
    let chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMsg");

    res.status(201).json(chats);
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

module.exports = { createChat, fetchChats };
