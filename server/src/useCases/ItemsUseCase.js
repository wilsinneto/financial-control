const { optionsDescription } = require("../utils/OptionsSequelizeNormalize");

class ItemsUseCase {
  constructor(Items) {
    this.Items = Items;
  }
  async update(data, id) {
    const verifyDescription = optionsDescription(data.description);
    const itemAlreadyExists = await this.Items.findOne(verifyDescription);
    if (itemAlreadyExists) return { error: true };
    return await this.Items.update(data, id);
  }
  async delete(data) {
    await this.Items.destroy(data);
  }
  async getAll() {
    return await this.Items.findAll();
  }
  async create(data) {
    console.log("ItemsUseCase");
    const verifyDescription = optionsDescription(data.description);
    const itemAlreadyExists = await this.Items.findOne(verifyDescription);
    if (itemAlreadyExists) return { error: true };
    return await this.Items.create(data);
  }
}

module.exports = ItemsUseCase;
