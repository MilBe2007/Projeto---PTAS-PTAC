const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const adm = require("../middlewares/admMiddleware");
const MesaController = require("../controllers/mesaController");

router.get("/", MesaController.buscarMesas);

router.post("/novo", auth, adm, MesaController.cadastrarMesa);

router.get("/disponibilidade", MesaController.disponibilidade);
router.post("/disponibilidade", MesaController.disponibilidade);

module.exports = router;
