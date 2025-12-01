const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ReservaController {
  static async reservarMesa(req, res) {
    try {
      const userId = req.userId;
      const { data, n_pessoas, mesaId } = req.body;
      if (!data || !n_pessoas || !mesaId) {
        return res.status(400).json({ erro: true, mensagem: "Dados ausentes" });
      }

      const dia = new Date(data + "T00:00:00");
      const start = new Date(dia.setHours(0, 0, 0, 0));
      const end = new Date(dia.setHours(23, 59, 59, 999));

      const mesa = await prisma.mesa.findUnique({ where: { id: Number(mesaId) } });
      if (!mesa) return res.status(404).json({ erro: true, mensagem: "Mesa não encontrada" });

      const ocupada = await prisma.reserva.findFirst({
        where: {
          mesaId: Number(mesaId),
          data: { gte: start, lte: end }
        }
      });

      if (ocupada) {
        return res.status(400).json({ erro: true, mensagem: "Mesa já reservada para essa data" });
      }

      await prisma.reserva.create({
        data: {
          data: new Date(data + "T12:00:00"), 
          usuarioId: userId,
          mesaId: Number(mesaId)
        }
      });

      return res.json({ erro: false, mensagem: "Reserva criada com sucesso" });
    } catch (error) {
      return res.status(500).json({ erro: true, mensagem: error.message });
    }
  }

  static async verMinhasReservas(req, res) {
    try {
      const userId = req.userId;
      const reservas = await prisma.reserva.findMany({
        where: { usuarioId: userId },
        include: {
          mesa: true,
          usuario: {
            select: {
              id: true, nome: true, email: true
            }
          }
        }
      });
      return res.json({ erro: false, mensagem: "OK", reservas });
    } catch (error) {
      return res.status(500).json({ erro: true, mensagem: error.message });
    }
  }

  static async cancelarReserva(req, res) {
    try {
      const userId = req.userId;
      const { reservaId } = req.body;

      if (!reservaId) return res.status(400).json({ erro: true, mensagem: "reservaId ausente" });

      const reserva = await prisma.reserva.findUnique({ where: { id: Number(reservaId) } });
      if (!reserva) return res.status(404).json({ erro: true, mensagem: "Reserva não encontrada" });

      if (reserva.usuarioId !== userId) {
        return res.status(403).json({ erro: true, mensagem: "Apenas o dono da reserva pode cancelar" });
      }

      await prisma.reserva.delete({ where: { id: Number(reservaId) } });
      return res.json({ erro: false, mensagem: "Reserva cancelada" });
    } catch (error) {
      return res.status(500).json({ erro: true, mensagem: error.message });
    }
  }

  static async listarReservasPorData(req, res) {
    try {
      const { data } = req.query || req.body || {};
      if (!data) return res.status(400).json({ erro: true, mensagem: "Data ausente" });

      const dia = new Date(data + "T00:00:00");
      const start = new Date(dia.setHours(0, 0, 0, 0));
      const end = new Date(dia.setHours(23, 59, 59, 999));

      const reservas = await prisma.reserva.findMany({
        where: {
          data: { gte: start, lte: end }
        },
        include: {
          mesa: true,
          usuario: {
            select: { id: true, nome: true, email: true }
          }
        }
      });

      return res.json({ erro: false, mensagem: "OK", reservas });
    } catch (error) {
      return res.status(500).json({ erro: true, mensagem: error.message });
    }
  }
}

module.exports = ReservaController;
