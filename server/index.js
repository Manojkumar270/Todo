const express = require("express");
const app = express();
const taskData = require("./schema");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const secret = "manoj";

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

app.post("/register", (req, res) => {
  try {
    let { email, password } = req.body;
    let emaildata = null;
    if (emaildata) {
      res.send({ message: "user already exist", status: 201 });
      return;
    } else {
      let token = jwt.sign({ id: 1234 }, secret, { expiresIn: "5m" });
      res.send({
        message: "registered successfully",
        status: 200,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// app.use(auth);

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

app.put("/update/:id", async (req, res) => {
  try {
    let task = await taskData.findById(req.params.id);
    if (task.update == true) {
      task.update = false;
    } else {
      task.update = true;
    }
    await task.save();
    res.send({ status: 200 });
  } catch (error) {
    console.error("Error in /post route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/change/:id", async (req, res) => {
  try {
    let task = await taskData.findById(req.params.id);
    task.task = req.body.task;
    task.update = false;
    await task.save();
    res.send({ status: 200 });
  } catch (error) {
    console.error("Error in /post route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function auth(req, res, next) {
  try {
    let token = req.headers.token;
    let result = jwt.verify(token, secret);
    if (result) {
      next();
      return;
    } else {
      res.send({ message: error.message, status: 401 });
    }
  } catch (error) {
    res.send({ message: error.message, status: 401 });
  }
}

app.get("/auth", auth, async (req, res) => {
  try {
    res.send({ message: "you have access", status: 200 });
    return;
  } catch (error) {
    res.send({ error: error.message, status: 401 });
    return;
  }
});

app.listen("2222", () => console.log("connected"));
