import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const ristoranti = await db.collection("_Ristoranti").find().toArray();
  res.json(ristoranti);
});

router.get("/menu/:ristoranteId", async (req, res) => {
  const menu = await db
    .collection("menu")
    .find({ ristoranteId: req.params.ristoranteId })
    .toArray();
  res.json(menu);
});

export default router;
