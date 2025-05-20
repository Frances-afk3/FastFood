import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const condimenti = await db.collection("condimenti").find().toArray();
  res.json(condimenti);
});

export default router;
