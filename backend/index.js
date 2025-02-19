import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Routes
import todoRouter from "./routes/todo.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve API routes
app.use("/api/todos", todoRouter);
app.get("/heartbeat", (_, res) => {
  return res.send({ message: "Hello World!" });
});

// MongoDB connection
const port = process.env.PORT || 8000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server
    app.listen(port, () =>
      console.log(`Server running on port http://localhost:${port}`)
    );
  })
  .catch((error) => {
    console.log(error.message);
  });
