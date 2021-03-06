module.exports = (sequelize, DataTypes) => {
  const responsible = sequelize.define('responsible', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    timestamps: true,
    paranoid: true,
  })

  responsible.associate = (models) => {
    responsible.hasMany(models.equipment, {
      foreignKey: 'responsible_id',
    })
  }

  return responsible
}
