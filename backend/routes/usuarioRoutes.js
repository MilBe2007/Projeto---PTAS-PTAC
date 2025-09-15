const router = require("express").Router();

const usuarioController = require("../controllers/usuarioController");

router.post("/auth/login", usuarioController.login);
router.post("/auth/cadastro",usuarioController.cadastrar);

module.exports = router;