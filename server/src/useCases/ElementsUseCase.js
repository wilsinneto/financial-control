class ElementsUseCase {

  constructor(Items, Elements) {
    this.Items = Items;
    this.Elements = Elements;
  }

  async getPeriod(dates) {
    const data = await this.Elements.findAll(dates);
    if (!data) return { erro: true };
    return data;
  }

  async delete(id) {
    const element = await this.Elements.destroy(id);
    if (!element) return { error: true };
    return element;
  }

  async update(id, description, payload) {
    const itemAlreadyExists = await this.Items.findOne(description);
    if (!itemAlreadyExists) return { error: true };
    const itemId = itemAlreadyExists.dataValues.id;
    const { value, date } = payload;
    await this.Elements.update({ value, date, itemId }, id);
  }

  async getAll(sortByElements) {
    const elements = await this.Elements.findAll(sortByElements);
    if (!elements) return { error: true };
    return elements;
  }

  async create(description, value, date) {
    const item = await this.Items.findOne({ where: { description } });
    if (!item) return { error: true };
    const itemId = item.dataValues.id;
    return await this.Elements.create({ value, date, itemId });
  }
}

module.exports = ElementsUseCase;
