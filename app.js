const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const app = express();

//connectting mongodb
connectDB();
//bodyparser
app.use(express.json());
//middlewares
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/profile", require("./routes/profile"));

app.listen(5000, () => console.log(`listening to post 5000`));
