const processValues = require("../servicio/processValues");

class APIInfo {
  constructor() {}

  async getInfo(ctx) {
    const info = processValues.get();
    ctx.body = { info: info };
  }
}

module.exports = new APIInfo();
