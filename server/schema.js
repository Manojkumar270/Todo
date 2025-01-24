const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false, // Default value
  },
  update: {
    type: Boolean,
    default: false, // Default value
  },
});
const tasks = mongoose.model("taskData", taskSchema);
module.exports = tasks;
