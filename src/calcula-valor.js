function calcularMontante (capital, taxa, periodo) {
  let montante = capital * Math.pow((1 + taxa), periodo - 1)
  montante = arredondar(montante)
  return montante
}

function arredondar (valor) {
  const precisao = 100
  return Math.round((valor + Number.EPSILON) * precisao) / precisao
}

function calcularPrestacoes (montante, numeroParcelas) {
  montante = arredondar(montante)
  const prestacaoBase = arredondar(montante / numeroParcelas)
  const array = Array(numeroParcelas).fill(prestacaoBase)

  const total = arredondar(numeroParcelas * prestacaoBase)
  let resto = arredondar((montante - (total)))

  let index = 0
  while (resto > 0) {
    array[index] = arredondar(array[index] + 0.01)
    resto = arredondar(resto - 0.01)
    index++
  }

  index = numeroParcelas - 1
  while (resto < 0) {
    array[index] = arredondar(array[index] - 0.01)
    resto = arredondar(resto + 0.01)
    index--
  }

  return array
}

module.exports = { calcularMontante, arredondar, calcularPrestacoes }
