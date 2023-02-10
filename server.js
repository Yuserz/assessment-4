const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Set up environment variables
const port = process.env.PORT || 3000;
const mongodbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017";
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3001";

const corsOptions = {
  origin: corsOrigin,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use middleware functions
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB successfully.");
});

// Define the user schema
const userSchema = new mongoose.Schema({
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

// Compile the schema into a model
//First param is the collection name
const User = mongoose.model("user", userSchema);

// POST method to create a new user
app.post("/api/users", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const user = new User(req.body);
    await user.save();
    res.send({ success: "Email and password stored successfully" });
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      res.status(500).send({ error: "Email is already taken" });
    } else {
      next(error);
    }
  }
});
// GET method to retrieve all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET method to retrieve a single user by email
app.get("/api/users/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      res.status(404).send({ error: "User not found" });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// DELETE method to delete a single user by email
app.delete("/api/users/:email", async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ email: req.params.email });
    if (!user) {
      res.status(404).send({ error: "User not found" });
    } else {
      res.send({ success: "User deleted successfully" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// PATCH method to update a single user by email
app.patch("/api/users/:email", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!user) {
      res.status(404).send({ error: "User not found" });
    } else {
      res.send({ success: "User updated successfully" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//Login Endpoint
app.post("/api/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "Email or password is incorrect" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ error: "Email or password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "12345", {
      expiresIn: "1h",
    });
    res.send({ success: "User logged in successfully", token });
  } catch (error) {
    next(error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
