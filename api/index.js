const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* rota teste */
app.get("/", (req, res) => {
  res.send("Backend Doge está online 🚀");
});

/* exemplo login */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "test@test.com" && password === "1234") {
    return res.json({ success: true });
  }

  res.status(401).json({ success: false });
});

module.exports = app;
