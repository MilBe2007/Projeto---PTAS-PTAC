const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PerfilController {
  static async verMeuPerfil(req, res) {
    try {
      const userId = req.usuario.id; 

      const usuario = await prisma.usuario.findUnique({
        where: { id: userId },
        select: {
          id: true,
          nome: true,
          email: true
        }
      });

      if (!usuario) {
        return res.status(404).json({ erro: true, mensagem: "Usuário não encontrado" });
      }

      return res.json({ erro: false, mensagem: "OK", usuario });
    } catch (error) {
      return res.status(500).json({ erro: true, mensagem: error.message });
    }
  }

  static async atualizarMeuPerfil(req, res) {
    try {
      const userId = req.usuario.id; 
      const { usuario } = req.body;

      if (!usuario) {
        return res.status(400).json({ erro: true, mensagem: "Dados ausentes" });
      }

      const updated = await prisma.usuario.update({
        where: { id: userId },
        data: {
          nome: usuario.nome,
          email: usuario.email
        },
        select: {
          id: true,
          nome: true,
          email: true
        }
      });

      return res.json({ erro: false, mensagem: "Perfil atualizado", usuario: updated });

    } catch (error) {
      if (error.code === "P2002") {
        return res.status(400).json({ erro: true, mensagem: "Email já cadastrado" });
      }
      return res.status(500).json({ erro: true, mensagem: error.message });
    }
  }

  static async buscarUsuarios(req, res) {
    try {
      const usuarios = await prisma.usuario.findMany({
        select: {
          id: true,
          nome: true,
          email: true
        }
      });

      return res.json({ erro: false, mensagem: "OK", usuarios });

    } catch (error) {
      return res.status(500).json({ erro: true, mensagem: error.message });
    }
  }
}

module.exports = PerfilController;
