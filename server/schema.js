const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  update: {
    type: Boolean,
    default: false,
  },
});

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const taskData = mongoose.model("taskData", taskSchema);
const regData = mongoose.model("regData", registerSchema);
module.exports = { taskData, regData };
