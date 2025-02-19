import path from "path";
import { fileURLToPath } from "url";
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

    // Serve frontend files in production
    if (process.env.NODE_ENV === "production") {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      app.use(express.static(path.join(__dirname, "../frontend/dist")));

      // Serve `index.html` for any unknown route
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
      });
    }

    // Start the server
    app.listen(port, () =>
      console.log(`Server running on port http://localhost:${port}`)
    );
  })
  .catch((error) => {
    console.log(error.message);
  });
