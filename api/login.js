const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  // Apenas POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const filePath = path.join(process.cwd(), "users.json");

    // Se não existir, cria
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]");
    }

    const data = fs.readFileSync(filePath, "utf-8") || "[]";
    const users = JSON.parse(data);

    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: "Email e password são obrigatórios" });
    }

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    return res.status(200).json({
      success: true,
      message: "Login realizado com sucesso",
      user: { email: user.email }
    });

  } catch (err) {
    return res.status(500).json({
      error: "Erro interno no servidor",
      details: err.message
    });
  }
};
