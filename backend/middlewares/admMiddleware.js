function adminMiddleware(req, res, next) {
  if (req.usuario.role !== "ADM") {
    return res.status(403).json({ erro: true, mensagem: "Apenas administradores" });
  }

  next();
}

module.exports = adminMiddleware;
