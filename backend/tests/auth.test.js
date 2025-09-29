const request = require("supertest");
const server = require("../index");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("Testes de integração - Autenticação e Cadastro", () => {
  const usuarioTeste = {
    nome: "Usuário Teste",
    email: "teste@example.com",
    password: "123456"
  };

  beforeAll(async () => {
    await prisma.usuario.deleteMany({
      where: { email: usuarioTeste.email }
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });

  test("POST /auth/cadastro - deve cadastrar usuário novo", async () => {
    const res = await request(server).post("/auth/cadastro").send(usuarioTeste);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
    expect(res.body.erro).toBe(false);
    expect(res.body).toHaveProperty("token");
  });

  test("POST /auth/cadastro - deve falhar ao cadastrar com email já existente", async () => {
    const res = await request(server).post("/auth/cadastro").send(usuarioTeste);

    expect(res.status).toBe(400);
    expect(res.body.erro).toBe(true);
    expect(res.body).toHaveProperty("mensagem");
  });

  test("POST /auth/login - deve autenticar usuário válido", async () => {
    const res = await request(server).post("/auth/login").send({
      email: usuarioTeste.email,
      password: usuarioTeste.password
    });

    expect(res.status).toBe(200);
    expect(res.body.erro).toBe(false);
    expect(res.body).toHaveProperty("token");
  });

  test("POST /auth/login - deve falhar com email inexistente", async () => {
    const res = await request(server).post("/auth/login").send({
      email: "naoexiste@example.com",
      password: "123456"
    });

    expect(res.status).toBe(400);
    expect(res.body.erro).toBe(true);
    expect(res.body).toHaveProperty("mensagem");
  });

  test("POST /auth/login - deve falhar com senha incorreta", async () => {
    const res = await request(server).post("/auth/login").send({
      email: usuarioTeste.email,
      password: "senhaerrada"
    });

    expect(res.status).toBe(400);
    expect(res.body.erro).toBe(true);
    expect(res.body).toHaveProperty("mensagem");
  });
});
