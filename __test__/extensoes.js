const calcularValor = require('../src/calcula-valor.js')

expect.extend({
  tenhaSomaDeValoresIgual (items, soma) {
    const somaReal = calcularValor.arredondar(items.reduce((a, t) => a + t))
    const passou = somaReal === calcularValor.arredondar(soma)

    return {
      message: () => `A soma ${somaReal} deve ser igual a ${soma}`,
      pass: passou
    }
  },

  sejaDecrescente (items) {
    for (let i = 0; i < items.length - 1; i++) {
      const j = i + 1
      if (items[i] < items[j]) {
        return {
          message: () => 'O array deve estar em ordem decrescente',
          pass: false
        }
      }
    }

    return {
      message: () => 'O array deve estar em ordem decrescente',
      pass: true
    }
  }

})
