const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('bills', {  
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    } , 
    bill: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    payto: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    billamount: {
      type: DataTypes.DOUBLE,
      allowNull: true, 

    },
    invoicedate: {
      type: DataTypes.DATEONLY,
      allowNull:true
    },

    duedate: { 
      type: DataTypes.DATEONLY,  
      allowNull: true,
    },

    billstatus: { 
      type: DataTypes.STRING,  
      allowNull: true,
    },
    datepaid: {
        type: DataTypes.DATEONLY,
        allowNull:true
      },
    paidby: { 
        type: DataTypes.STRING,  
        allowNull: true,
      },
    createdate: {
        type: DataTypes.DATEONLY,
        allowNull:true
      },
    files: { 
        type: DataTypes.STRING,  
        allowNull: true,
      },
    comments: {
        type: DataTypes.STRING,
        allowNull:true
      },
      variancecode: { 
        type: DataTypes.STRING,  
        allowNull: true,
      },
    costcode: {
        type: DataTypes.STRING,
        allowNull:true
      },
      relatedpos: {
        type: DataTypes.STRING,
        allowNull:true
      },
      lienwaivers: { 
        type: DataTypes.STRING,  
        allowNull: true,
      },

  },{ timestamps: false }, );
};
