const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  // Só aceita POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const file = path.join(process.cwd(), "users.json");

    // Garante que users.json existe
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, "[]");
    }

    const data = fs.readFileSync(file, "utf8") || "[]";
    const users = JSON.parse(data);

    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email e senha são obrigatórios" });
    }

    if (users.find((u) => u.email === email)) {
      return res
        .status(409)
        .json({ success: false, message: "Utilizador já existe" });
    }

    users.push({
      email,
      password,
      steps: 0,
      doge: 0,
      wallet_testnet:
        "testnet_" + Math.random().toString(36).slice(2),
      history: [],
    });

    fs.writeFileSync(file, JSON.stringify(users, null, 2));

    return res.status(201).json({ success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Erro no servidor" });
  }
};
