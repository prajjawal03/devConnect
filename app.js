const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

//connectting mongodb
const db = process.env.mongo_url;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("connected to db"))
  .catch((err) => console.log(err));

//bodyparser
app.use(express.json());
app.use(cors());
//middlewares
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/profile", require("./routes/profile"));

app.listen(5000, () => console.log(`listening to post 5000`));
