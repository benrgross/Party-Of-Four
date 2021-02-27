module.exports = (sequelize, DataTypes) => {
  const WatchList = sequelize.define("WatchList", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  return WatchList;
};
