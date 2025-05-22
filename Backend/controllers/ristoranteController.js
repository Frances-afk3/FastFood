import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerRistorante = async (req, res) => {
  const { nome, email, password } = req.body;

  if (!nome || !email || !password) {
    return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
  }

  const existing = await db.collection("ristoranti").findOne({ email });
  if (existing) {
    return res.status(409).json({ error: "Email già registrata" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const result = await db.collection("ristoranti").insertOne({ nome, email, password: hashed });

  res.status(201).json({ message: "Registrazione completata", id: result.insertedId });
};

export const loginRistorante = async (req, res) => {
  const { email, password } = req.body;

  const ristorante = await db.collection("ristoranti").findOne({ email });
  if (!ristorante || !(await bcrypt.compare(password, ristorante.password))) {
    return res.status(401).json({ error: "Credenziali non valide" });
  }

  const token = jwt.sign({ id: ristorante._id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token, ristorante: { id: ristorante._id, nome: ristorante.nome, email } });
};
