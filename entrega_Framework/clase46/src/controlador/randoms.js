const randoms = require("../servicio/randoms");

const RANDOM_DEFAULT_COUNT = 100000000;

class APIRandoms {
  async get(ctx) {
    const rawCount = ctx.query.cant;
    const parsedCount = Number.parseInt(rawCount, 10);
    const finalCount = Number.isNaN(parsedCount)
      ? RANDOM_DEFAULT_COUNT
      : parsedCount;
    const randomNumbers = await randoms.generateRandomNumbers(finalCount);
    ctx.body = randomNumbers;
  }
}

module.exports = APIRandoms;
