const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const adm = require("../middlewares/admMiddleware");
const PerfilController = require("../controllers/perfilController");

router.get("/meu-perfil", auth, PerfilController.verMeuPerfil);

router.patch("/atualizar", auth, PerfilController.atualizarMeuPerfil);

router.get("/todos", auth, adm, PerfilController.buscarUsuarios);

module.exports = router;
