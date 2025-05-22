import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const ordine = req.body;
  const result = await db.collection("_Ordinazioni").insertOne(ordine);
  res.json({ success: true, id: result.insertedId });
});

export default router;
