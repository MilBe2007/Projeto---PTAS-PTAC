const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET || "segredo";

class UsuarioController {
  static async cadastro(req, res) {
    try {
      const { nome, email, password } = req.body;

      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email }
      });

      if (usuarioExistente) {
        return res.status(400).json({ erro: true, mensagem: "Email já cadastrado" });
      }

      const novoUsuario = await prisma.usuario.create({
        data: { nome, email, password }
      });

      const token = jwt.sign({ id: novoUsuario.id }, SECRET, { expiresIn: "1h" });

      return res.status(200).json({
        erro: false,
        mensagem: "Usuário cadastrado com sucesso",
        token
      });
    } catch (error) {
      return res.status(500).json({ erro: true, mensagem: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const usuario = await prisma.usuario.findUnique({
        where: { email }
      });

      if (!usuario) {
        return res.status(400).json({ erro: true, mensagem: "Email não encontrado" });
      }

      if (usuario.password !== password) {
        return res.status(400).json({ erro: true, mensagem: "Senha incorreta" });
      }

      const token = jwt.sign({ id: usuario.id }, SECRET, { expiresIn: "1h" });

      return res.status(200).json({ erro: false, mensagem: "Login realizado", token });
    } catch (error) {
      return res.status(500).json({ erro: true, mensagem: error.message });
    }
  }
}

module.exports = UsuarioController;
