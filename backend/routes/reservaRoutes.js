const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const adm = require("../middlewares/admMiddleware");
const ReservaController = require("../controllers/reservaController");

router.post("/novo", auth, ReservaController.reservarMesa);

router.post("/", auth, ReservaController.verMinhasReservas);

router.delete("/", auth, ReservaController.cancelarReserva);

router.get("/listar", auth, adm, ReservaController.listarReservasPorData);

module.exports = router;
