import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  status: {
    type: String,
    enum: ["New", "Contacted", "Converted"],
    default: "New"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Lead", leadSchema);
