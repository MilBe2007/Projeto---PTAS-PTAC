require("dotenv").config();
const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();
app.use(express.json());

// Registrar rotas
app.use("/auth", usuarioRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = server;
