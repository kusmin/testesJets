const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: '0.0.0.0',
  port: 12345,
  database: 'consulta_credito',
  username: 'jest',
  password: 'jest',
  logging: false
})

const clienteModel = (sequelize, DataTypes) => {
  return sequelize.define('Cliente', {
    CPF: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    Nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  })
}

const consultaModel = (sequelize, DataTypes) => {
  return sequelize.define('Consulta', {
    Valor: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    NumPrestacoes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Juros: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Montante: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Prestacoes: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}

const cliente = clienteModel(sequelize, Sequelize.DataTypes)
const consulta = consultaModel(sequelize, Sequelize.DataTypes)

cliente.hasMany(consulta, { as: 'Consulta' })
consulta.belongsTo(cliente)

consulta.sync()
cliente.sync()

module.exports = { cliente, consulta, sequelize }
