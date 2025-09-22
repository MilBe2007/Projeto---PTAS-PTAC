const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UsuarioController {
  static async cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
      },
    });

    res.json({ usuarioId: usuario.id });
  }

  static async login(req, res) {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      res.json({ msg: "Usuário não encontrado!" });
      return;
    }

    if (usuario.senha !== senha) {
      res.json({ msg: "Senha incorreta!" });
      return;
    }

    res.json({
      msg: "Login realizado com sucesso!",
      usuarioId: usuario.id,
    });
  }
}

// 👇 Exporta a classe corretamente
module.exports = UsuarioController;
