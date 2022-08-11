const Router = require("koa-router");

const APIRandoms = require("../controlador/randoms");
const apiRandoms = new APIRandoms();
const router = new Router("/api/randoms");

router.get("/", apiRandoms.get);

router.allowedMethods("*", (ctx) => {
  ctx.response.status = 403;
  ctx.body = { error: "METHOD NOT FOUND" };
});

module.exports = router;
