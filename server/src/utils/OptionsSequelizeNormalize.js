const { Sequelize } = require("sequelize");

const Op = Sequelize.Op;

exports.optionsId = (id) => ({ where: { id }});

exports.optionsDescription = (string) => (
  { where: { description: string } }
);

exports.optionsForUpdateElement = (body) => {
  const { value, date, description } = body;
  const element = { value, date, description };
  return element;
}

exports.optionsBetweenDate = (startDate, endDate) => ({
  where: {
    date: {
      [Op.between]: [startDate, endDate]
    }
  },
  include: "items"
});