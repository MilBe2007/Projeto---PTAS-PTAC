const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class MesaController {
  static async cadastrarMesa(req, res) {
    try {
      const { codigo, n_lugares } = req.body;
      if (!codigo || !n_lugares) return res.status(400).json({ erro: true, mensagem: "Dados ausentes" });

      await prisma.mesa.create({
        data: {
          codigo,
          n_lugares: Number(n_lugares)
        }
      });

      return res.json({ erro: false, mensagem: "Mesa cadastrada com sucesso" });
    } catch (error) {
      return res.status(500).json({ erro: true, mensagem: error.message });
    }
  }

  static async buscarMesas(req, res) {
    try {
      const mesas = await prisma.mesa.findMany({
        select: {
          id: true,
          codigo: true,
          n_lugares: true
        }
      });
      return res.json({ erro: false, mensagem: "OK", mesas });
    } catch (error) {
      return res.status(500).json({ erro: true, mensagem: error.message });
    }
  }

  static async disponibilidade(req, res) {
    try {
      const { data } = req.body || req.query || {};
      if (!data) return res.status(400).json({ erro: true, mensagem: "Data ausente (use yyyy-mm-dd)" });

      const dia = new Date(data + "T00:00:00");
      const start = new Date(dia.setHours(0, 0, 0, 0));
      const end = new Date(dia.setHours(23, 59, 59, 999));

      const mesas = await prisma.mesa.findMany({
        include: {
          reservas: {
            where: {
              data: { gte: start, lte: end }
            }
          }
        }
      });

      const resultado = mesas.map(m => ({
        id: m.id,
        codigo: m.codigo,
        n_lugares: m.n_lugares,
        reservas: m.reservas
      }));

      return res.json({ erro: false, mensagem: "OK", mesas: resultado });
    } catch (error) {
      return res.status(500).json({ erro: true, mensagem: error.message });
    }
  }
}

module.exports = MesaController;
