const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/users",userRouter);
app.use("/api/chats", chatRoutes);
app.use("/api/message", messageRoutes);


const server = app.listen(process.env.PORT || 3000)

const io = require("./socket").init(server);
io.on("connection", (socket)=>{
    
})