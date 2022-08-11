const Contenedor = require("../servicio/Contenedor");

class APIProductos {
  constructor() {
    this.contenedor = new Contenedor();

    /**
     * Hago el "bind" para que las funciones vean al "this" como este objeto
     * al ser llamadas desde el middleware.
     */
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.getFakeProducts = this.getFakeProducts.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.deleteById = this.deleteById.bind(this);
  }

  async getAll(ctx) {
    const result = await this.contenedor.getAll();
    ctx.body = { result };
  }

  async getById(ctx) {
    const id = ctx.params.id;
    await this._throwErrorIfNotExists(id);
    const result = await this.contenedor.getById(id);
    ctx.body = { result };
  }

  async getFakeProducts(ctx) {
    ctx.body = this.contenedor.getFakeProducts(5);
  }

  async add(ctx) {
    const { title, price, thumbnail } = ctx.request.body;
    const result = await this.contenedor.save(title, price, thumbnail);
    ctx.body = { result };
  }

  async update(ctx) {
    const id = ctx.params.id;
    await this._throwErrorIfNotExists(id);
    const { title, price, thumbnail } = ctx.request.body;
    const result = await this.contenedor.update(id, title, price, thumbnail);
    ctx.body = { result };
  }

  async deleteById(ctx) {
    const id = ctx.params.id;
    await this._throwErrorIfNotExists(id);
    await this.contenedor.deleteById(id);
    ctx.body = { result: true };
  }

  /**
   * PRIVATE METHODS.
   */

  async _throwErrorIfNotExists(id) {
    try {
      const exists = await this.contenedor.exists(id);
      if (!exists) {
        throw new Error("producto no encontrado");
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = APIProductos;
