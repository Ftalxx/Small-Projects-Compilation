import { uniqueNamesGenerator, colors, names } from "unique-names-generator";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://ftalxx:Jaz.13463631@chatappcluster0.s9ims.mongodb.net/';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Define the Message schema
const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Define the Task schema
const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: String,
  status: { 
    type: String, 
    enum: ['To Do', 'In Progress', 'Done'], 
    default: 'To Do' 
  },
  assignedTo: String,
  deadline: Date,
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});
const Task = mongoose.model('Task', taskSchema);

// Middleware to parse JSON
app.use(express.json());

// API routes for tasks
app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Socket.io connection
io.on("connection", async (socket) => {
  const username = getUniqueUsername();
  console.log(`${username} connected`);

  // Fetch chat history from MongoDB
  const chatHistory = await Message.find().sort({ timestamp: -1 }).limit(50);

  socket.emit("receive-messages", {
    chatHistory: chatHistory.reverse(),
    username,
  });

  socket.on("post-message", async (data) => {
    const { message } = data || { message: "" };
    console.log(message);

    // Save the message to MongoDB
    const newMessage = new Message({ username, message });
    await newMessage.save();

    // Emit the message to all clients
    io.emit("receive-messages", {
      chatHistory: await Message.find().sort({ timestamp: -1 }).limit(50),
    });
  });

  socket.on("disconnect", () => {
    console.log(`${username} disconnected`);
  });
});

app.use(express.static(process.cwd() + "/frontend"));

app.get("/", (req, res) => {
  return res.sendFile(process.cwd() + "/frontend/index.html");
});

server.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});

// Helper functions
function getUniqueUsername() {
  return uniqueNamesGenerator({
    dictionaries: [names, colors],
    length: 2,
    style: "capital",
    separator: " ",
  });
}
