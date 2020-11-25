const { Sequelize } = require("sequelize");

const Op = Sequelize.Op;

exports.optionsId = (id) => ({ where: { id }});

exports.optionsDescription = (string) => (
  { where: { description: string }}
);

exports.optionsBetweenDate = (startDate, endDate) => ({
  where: {
    date: {
      [Op.between]: [startDate, endDate]
    }
  },
  include: "expenses"
});