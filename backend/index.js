const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");
const ownerLogin = require("./routes/owner/login");
const ownerSignup = require("./routes/owner/signUp");
const addNew = require("./routes/posts/addNew");    

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

try {
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to MongoDB");
  });
} catch (error) {
  console.log(error);
}

app.use("/", ownerLogin);
app.use("/", ownerSignup);
app.use("/post", addNew);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
