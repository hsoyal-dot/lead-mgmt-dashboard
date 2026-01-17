import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import leadRoutes from "./routes/leadRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/leads", leadRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);