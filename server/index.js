const express = require("express");
const app = express();
const { taskData, regData } = require("./schema");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const secret = "manoj";
let val;

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

// app.use(auth);

app.get("/get", async (req, res) => {
  let tasks = await taskData.find();
  // await taskData.updateMany({}, { update: false });
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
    if (task.completed == false) {
      task.completed = true;
    } else {
      task.completed = false;
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

app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await regData.find();
    res.send({ data: allUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/newUser", async (req, res) => {
  try {
    const existingUser = await regData.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = new regData(req.body);
    await newUser.save();

    const allUser = await regData.find();
    res.status(201).json({ data: allUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await regData.findOne({ email });
    if (!user) {
      res.send({
        message: "User not found ,please Register",
        status: 400,
      });
    } else {
      if (user.email == email && user.password == password) {
        let token = jwt.sign({ id: 1234 }, secret, { expiresIn: "5m" });
        res.send({ message: "login successfully", status: 201, token: token });
      } else {
        res.send({ message: "incorrect Password", status: 201 });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen("2222", () => console.log("connected"));
