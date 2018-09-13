const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleEmails: String,
  googleToken: String
});

mongoose.model("users", userSchema);
