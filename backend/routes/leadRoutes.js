import express from "express";
import Lead from "../models/Lead.js";

const router = express.Router();

// GET /api/leads?search=&status=&page=&limit=&sort=
router.get("/", async (req, res) => {
  const { search, status, page = 1, limit = 10, sort = "createdAt" } = req.query;

  let query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (status) {
    query.status = status;
  }

  const leads = await Lead.find(query)
    .sort({ [sort]: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Lead.countDocuments(query);

  res.json({ leads, total });
});

// GET /api/leads/:id
router.get("/:id", async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  res.json(lead);
});

export default router;