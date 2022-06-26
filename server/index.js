const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const cookieParser = require("cookie-parser");
const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const messageRouter = require("./routers/messageRouter");
const { Server } = require("socket.io");

app.use(
  cors({
    origin: "*",
  })
);

// for socket.io
const io = new Server(server, {
  cors: {
    origin: "https://kpop21.com",
  },
});

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});

global.io = io;

// request persers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(
  "/profilePicture",
  express.static(path.join(__dirname, "public/profilePicture"))
);
app.use(cookieParser(process.env.COOKIE_SECRET));

// connection Database
require("./config/db");

// routing sutup
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/post", postRouter);
app.use("/api/message", messageRouter);

// not foundHandler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

server.listen(process.env.PORT || 5000, () => {
  console.log("Server is running!");
});
