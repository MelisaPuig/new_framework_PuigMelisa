const Router = require("koa-router");

const apiInfo = require("../controlador/info");
const router = new Router({ prefix: "/info" });

router.get("/", apiInfo.getInfo);

router.allowedMethods("*", (ctx) => {
  ctx.response.status = 403;
  ctx.body = { error: "METHOD NOT FOUND" };
});

module.exports = router;
