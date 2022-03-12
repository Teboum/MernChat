const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRouter = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoute");
dotenv.config();

connectDB();

const app = express();

app.use(express.json()); //to accept json bodyparser ?

// app.get("/api/chat/:id", (req, res) => {
//   res.send(chats.find((e) => e._id === req.params.id));
// });
app.use("/api/user", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/message", messageRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server listen ${PORT}`.yellow.bold));
