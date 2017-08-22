export default (sequelize, DataTypes) => {
  var place = sequelize.define('place', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    latitude: {
      type: DataTypes.DECIMAL(10,6),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    longitude: {
      type: DataTypes.DECIMAL(10,6),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate: function(models) {
        place.hasMany(models.equipment, {
          foreignKey: 'place_id',
          as: 'place'
        });
      }
    }
  });
  return place;
};