const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('po', {  
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    } ,  
    job: {
      type: DataTypes.STRING,
      allowNull:true
    },
    ponumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    variancecode: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    costcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },


    performedby: {
      type: DataTypes.STRING,
      allowNull: true, 

    },
    estcomplete: {
      type: DataTypes.STRING,
      allowNull:true
    },

    postatus: { 
      type: DataTypes.STRING,  
      allowNull: true,
    },
    workstatus: {
        type: DataTypes.STRING,
        allowNull:true
      },
      paid: {
        type: DataTypes.STRING,
        allowNull:true
      },
      cost: {
        type: DataTypes.DOUBLE,
        allowNull:true
      },
  },{ timestamps: false }, );
};
