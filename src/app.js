const express = require('express')
const consultaCliente = require('./consulta-cliente.js')
const app = express()

const { check, validationResult } = require('express-validator')

app.use(express.json())

app.get('/', async (_req, res) => {
  res.status(200).send('Mensagem de test')
})

app.post('/consulta-credito',
  check('nome', 'Nome deve ser informado').notEmpty(),
  check('CPF', 'CPF deve ser informado').notEmpty(),
  check('valor', 'O valor deve ser informado e deve ser um numero').notEmpty().isFloat(),
  check('parcelas', 'Parcelas deve ser informado e deve ser um inteiro').notEmpty().isInt(),

  async (req, res) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() })
    }

    try {
      const valores = await consultaCliente.consultar(
        req.body.nome,
        req.body.CPF,
        req.body.valor,
        req.body.parcelas
      )
      res.status(201).json(valores)
    } catch (err) {
      return res.status(405).json({ erro: err.message })
    }
  }
)

module.exports = app
