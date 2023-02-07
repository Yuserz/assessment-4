const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const { mongo } = require("mongoose");
const MongoClient = mongodb.MongoClient;
const app = express();
const port = 3000;
const url = "mongodb://localhost:27017";

const corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

let db;

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    console.log("Error connecting to MongoDB: ", error);
    return;
  }

  db = client.db("MyData");
  console.log("Connected to MongoDB successfully.");

  //Schema
  const emailAndPasswordSchema = {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  };

  //POST method
  //Define a new collection to store the email and password
  const collection = db.collection("user");

  //Create Data
  app.post("/api/users", (req, res) => {
    const { email, password } = req.body;

    // Validate the request body against the schema
    if (!email || !password) {
      return res
        .status(400)
        .send({ error: "Both email and password are required" });
    }

    collection
      .insertOne({ email, password })
      .then((result) => {
        res.send({ success: "Email and password stored successfully" });
      })
      .catch((error) => {
        console.log(
          "Error inserting email and password into the database: ",
          error
        );
        res.status(500).send({
          error: "Error inserting email and password into the database",
        });
      });
  });

  //Get all users data
  app.get("/api/users", (req, res) => {
    db.collection("user")
      .find({})
      .toArray((error, result) => {
        if (error) {
          console.log("Error retrieving data from the database: ", error);
          return;
        }
        res.send(result);
      });
  });

  //Delete user with id
  app.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((result) => {
        res.send({ success: "Data deleted successfully" });
      })
      .catch((error) => {
        console.log("Error deleting data from the database: ", error);
        res
          .status(500)
          .send({ error: "Error deleting data from the database" });
      });
  });

  //Update user data
  app.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const userUpdates = req.body;

    db.collection("user").findOneAndUpdate(
      { _id: mongodb.ObjectId(id) },
      { $set: userUpdates },
      { returnOriginal: false },
      (error, result) => {
        if (error) {
          console.log("Error updating user: ", error);
          res.status(500).send({ error: "Error updating user" });
          return;
        }

        res.send(result.value);
      }
    );
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
