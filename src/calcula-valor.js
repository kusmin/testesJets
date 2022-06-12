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
  const prestacaoBase = arredondar(montante / numeroParcelas)
  const array = Array(numeroParcelas).fill(prestacaoBase)

  let resto = arredondar((montante - (prestacaoBase * numeroParcelas)))

  let index = 0
  while (resto) {
    array[index] = arredondar(array[index] + 0.01)
    resto = arredondar(resto - 0.01)
    index++
  }

  for (const prestacao of array) {
    console.log(prestacao)
  }

  return array
}

module.exports = { calcularMontante, arredondar, calcularPrestacoes }
