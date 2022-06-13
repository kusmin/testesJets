const calculaValor = require('../src/calcula-valor.js')
require('./extensoes')
describe('calcularMontante', () => {
  test('Com uma prestação o montante é igual ao capital', () => {
    // Operação
    const montante = calculaValor.calcularMontante(100, 0.0175, 1)

    // Resultado ou Comportamento esperado
    expect(montante).toBe(100)
  })

  test('Com 4 prestações o montante é acrescido de juros', () => {
    // Operação
    const montante = calculaValor.calcularMontante(500, 0.025, 4)

    // Resultado ou comportamento esperado
    expect(montante).toBe(538.45)
  })
})

describe('arredondar', () => {
  test('Arredondar duas casas decimais', () => {
    const resultado = calculaValor.arredondar(538.4453124999998)
    expect(resultado).toBe(538.45)
  })

  test('1.005 deve retornar 1.01', () => {
    const resultado = calculaValor.arredondar(1.005)

    expect(resultado).toBe(1.01)
  })
})

describe('calcular prestações', () => {
  test('O numero de parcelas é igual ao numero de prestações', () => {
    const numeroPrestacoes = 6
    const prestacoes = calculaValor.calcularPrestacoes(200, numeroPrestacoes)

    expect(prestacoes.length).toBe(numeroPrestacoes)
  })

  test('Uma unica prestação, valor vai ser igual ao montante', () => {
    const numeroPrestacoes = 1

    const prestacoes = calculaValor.calcularPrestacoes(50, numeroPrestacoes)

    expect(prestacoes.length).toBe(numeroPrestacoes)
    expect(prestacoes[0]).toBe(50)
  })

  test('Duas prestacoes, valor igual à metade do valor do montante', () => {
    const numeroPrestacoes = 2
    const prestacoes = calculaValor.calcularPrestacoes(50, numeroPrestacoes)

    expect(prestacoes.length).toBe(numeroPrestacoes)
    expect(prestacoes[0] + prestacoes[1]).toBe(50)
    expect(prestacoes[0]).toBe(50 / 2)
    expect(prestacoes[0]).toBe(prestacoes[1])
  })

  test('Valor da soma das prestações deve ser igual ao montante com duas casas decimais', () => {
    const numeroPrestacoes = 3
    const montante = 100

    const prestacoes = calculaValor.calcularPrestacoes(montante, numeroPrestacoes)

    expect(prestacoes.length).toBe(numeroPrestacoes)
    expect(prestacoes).tenhaSomaDeValoresIgual(montante)

    expect(prestacoes).sejaDecrescente()
  })

  test('Desafio semi final', () => {
    const numeroPrestacoes = 3
    const montante = 101.994

    const prestacoes = calculaValor.calcularPrestacoes(montante, numeroPrestacoes)

    expect(prestacoes.length).toBe(numeroPrestacoes)
    expect(prestacoes).tenhaSomaDeValoresIgual(montante)

    expect(prestacoes).sejaDecrescente()
  })
})
