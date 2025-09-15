const path = require("path");

class usuarioController {
    static async cadastrar(req, res) {
        const { nome, email, senha } = req.body;

        const usuario = await prisma.usuario.create({
            data: {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
            },
        });

        res.json({
            usuarioId: usuario.id,
        });
    }

    static async login(req, res) {
        const { email, senha } = req.body;

        const usuario = await prisma.usuario.findUnique({
            where: { email: email },
        });

        if(usuario == null ){
            res.json({
                msg: "Usuário não encontrado!",
            });
            return;
        }}
    }