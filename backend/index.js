require("dotenv").config();
const express = require("express");

const usuarioRoutes = require("./routes/usuarioRoutes");
const perfilRoutes = require("./routes/perfilRoutes");
const mesaRoutes = require("./routes/mesaRoutes");
const reservaRoutes = require("./routes/reservaRoutes");

const app = express();
app.use(express.json());

app.use("/auth", usuarioRoutes);
app.use("/perfil", perfilRoutes);
app.use("/mesas", mesaRoutes);
app.use("/reservas", reservaRoutes);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = server;
