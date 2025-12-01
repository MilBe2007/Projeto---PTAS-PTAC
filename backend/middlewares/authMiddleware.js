const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const SECRET = process.env.SECRET || "segredo";

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ erro: true, mensagem: "Token não informado" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET);

    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.id }
    });

    if (!usuario) {
      return res.status(401).json({ erro: true, mensagem: "Usuário inválido" });
    }

    req.usuario = usuario;   // usuário completo
    req.userId = usuario.id; // <-- AQUI ESTAVA FALTANDO!!!

    next();
  } catch (error) {
    return res.status(401).json({ erro: true, mensagem: "Token inválido" });
  }
}

module.exports = authMiddleware;
