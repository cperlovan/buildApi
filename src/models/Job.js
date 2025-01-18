const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('jobs', {  
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    } , 
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StreetAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    State: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ActualCompletion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    ActualStart: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    AmountInvoiced: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    ContractPrice: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    CostsOutstanding: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    CostsPaid: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    JobRunningTotal: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    PaymentsReceived: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    ProjCompletion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    ProjStart: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    TotalCosts: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },{ timestamps: false }, );
};
