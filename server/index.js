const express = require("express");
const app = express();
const taskData = require("./schema");
const mongoose = require("mongoose");
const cors = require("cors");

async function connect() {
  try {
    let connected = await mongoose.connect(
      "mongodb+srv://manojkumar:manoj123@cluster0.noffm.mongodb.net/"
    );

    console.log(connected.connection.host);
  } catch (error) {
    console.log(error.message);
  }
}

connect();
app.use(express.json());
app.use(cors());

app.get("/get", async (req, res) => {
  let tasks = await taskData.find();
  res.send({ task: tasks });
});

app.post("/post", async (req, res) => {
  try {
    const task = new taskData(req.body);
    await task.save();
    const result = await taskData.find();
    res.json({ data: result });
  } catch (error) {
    console.error("Error in /post route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const task = await taskData.findByIdAndDelete(req.params.id);
    res.send({ status: 200 });
  } catch (error) {
    console.error("Error in /post route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/complete/:id", async (req, res) => {
  try {
    let task = await taskData.findById(req.params.id);
    if (task.completed == true) {
      task.completed = false;
    } else {
      task.completed = true;
    }
    await task.save();
    res.send({ status: 200 });
  } catch (error) {
    console.error("Error in /post route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen("2222", () => console.log("connected"));
