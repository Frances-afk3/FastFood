import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { nome, email, password } = req.body;
  const esiste = await db.collection("_Ristorante").findOne({ email });
  if (esiste) return res.status(409).json({ error: "Email già registrata" });

  const result = await db.collection("_Ristorante").insertOne({ nome, email, password });
  res.json({ success: true, id: result.insertedId });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await db.collection("_Ristorante").findOne({ email, password });
  if (!user) return res.status(401).json({ error: "Credenziali non valide" });

  res.json({ success: true, user });
});

export default router;
