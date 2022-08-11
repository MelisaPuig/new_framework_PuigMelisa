const Router = require("koa-router");

const APIProductos = require("../controlador/productos");
const apiProductos = new APIProductos();
const router = new Router({ prefix: "/api/productos" });

router.get("/", apiProductos.getAll);
router.get("/:id", apiProductos.getById);
router.post("/", apiProductos.add);
router.put("/:id", apiProductos.update);
router.delete("/:id", apiProductos.deleteById);

router.allowedMethods("*", (ctx) => {
  ctx.response.status = 403;
  ctx.body = { error: "METHOD NOT FOUND" };
});

module.exports = router;
