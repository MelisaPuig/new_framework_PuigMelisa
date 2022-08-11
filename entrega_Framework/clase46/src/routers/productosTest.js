const Router = require("koa-router");

const APIProductos = require("../controlador/productos");
const apiProductos = new APIProductos();
const router = new Router({ prefix: "/api/productos-test" });

router.get("/", apiProductos.getFakeProducts);

router.allowedMethods("*", (ctx) => {
  ctx.response.status = 403;
  ctx.body = { error: "METHOD NOT FOUND" };
});

module.exports = router;
