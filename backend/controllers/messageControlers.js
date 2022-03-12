const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

exports.sendMessage = expressAsyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data pâssed into request");
    return res.sendStatus(400);
  }
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name,pic");
    message = await message.populate("chat", "name,pic");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      lastMessage: message,
    });
    res.json(message);
  } catch (err) {
    console.log(err);
    res.status(400);
    throw new Error(err.message);
  }
});

exports.allMessages = expressAsyncHandler(async (req, res, next) => {
  try {
    console.log(req.params);
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name,pic,email")
      .populate("chat");
    res.json(messages);
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
});
