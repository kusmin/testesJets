const request = require('supertest')
const app = require('../src/app')
const db = require('../src/db')

describe('Testes de integração', () => {
  beforeEach(async () => {
    try {
      await db.cliente.destroy({ where: {} })
      await db.consulta.destroy({ where: {} })
    } catch (err) {
      console.error(err)
    }
  })

  afterAll(async () => db.sequelize.close())

  const clienteJoao = {
    Nome: 'Joao Silva',
    CPF: '000.000.000-00'
  }

  const resultadoEsperado = {
    montante: 106.90,
    juros: 0.025,
    parcelas: 3,
    primeiraPrestacao: 35.64,
    pretacoes: [35.64, 35.63, 35.63]
  }

  const payloadRequest = {
    nome: clienteJoao.Nome,
    CPF: clienteJoao.CPF,
    valor: 101.75,
    parcelas: 3
  }

  test('responder http 200 na raiz', async () => {
    return request(app).get('/')
      .then(res => expect(res.status).toBe(200))
  })

  test('Cenario 1', async () => {
    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest)

    expect(res.body).toMathSnapshot(resultadoEsperado)
    expect(res.status).toBe(201)
  })

  test('Cenario 2', async () => {
    db.cliente.create(clienteJoao)
    db.consulta.create({
      Valor: 1,
      NumPrestacoes: 2,
      Juros: 0.5,
      Prestacoes: '1, 1',
      ClienteCPF: clienteJoao.CPF,
      Montante: 2,
      createdAt: '2016-06-22 19:10:25-07'
    })

    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest)

    // expect(res.body).toMathSnapshot(resultadoEsperado)
    expect(res.body).toMathObject(resultadoEsperado)
    expect(res.status).toBe(201)

    const count = await db.consulta.count({ where: { ClienteCPF: clienteJoao.CPF } })
    expect(count).toBe(2)
  })

  test('Cenario 3', async () => {
    const res1 = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest)

    expect(res1.body).toMathSnapshot(resultadoEsperado)

    const res2 = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest)

    expect(res2.body.erro).toBeDefined()
    expect(res2.status).toBe(405)
  })

  test('Cenario 4', async () => {
    const res = await request(app)
      .post('/consulta-credito')
      .send({})

    expect(res.body.erro).toBeDefined()
    expect(res.status).toBe(400)
  })

  test('responder http 200 na raiz', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
  })
})
