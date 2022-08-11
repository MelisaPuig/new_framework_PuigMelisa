const cluster = require("cluster");
const http = require("http");
const Koa = require("koa");
const koaBody = require("koa-body");
const os = require("os");

const CONFIG = require("./config");
const mongo = require("./persistencia/db/mongo");
const routerProductos = require("./routers/productos");
const routerProductosTest = require("./routers/productosTest");
const routerRandoms = require("./routers/randoms");
const routerInfo = require("./routers/info");

const app = new Koa();
// const server = http.Server(app);

/**
 * RUTEOS.
 */
app.use(koaBody());
app.use(routerInfo.routes());
app.use(routerRandoms.routes());
app.use(routerProductos.routes());
app.use(routerProductosTest.routes());
app.use((ctx) => {
  ctx.response.statusCode = 404;
  ctx.body = { error: "METHOD NOT FOUND" };
});

/**
 * INICIO DE SERVIDOR.
 */
async function startServerClustered() {
  if (cluster.isMaster) {
    const numWorkers = os.cpus().length;
    for (let i = 0; i < numWorkers; i++) {
      cluster.fork({ silent: true });
    }
    cluster.on("online", (worker) =>
      console.log(`Worker ${worker.process.pid} iniciado.`)
    );
    cluster.on("exit", (worker, code, signal) => {
      const { pid } = worker.process;
      console.log(`Worker ${pid} terminó con código ${code}.`);
    });
    return;
  }
  startServerForked();
}

async function startServerForked() {
  try {
    await mongo.connect(CONFIG.MONGO_URL);
    const { pid } = process;
    const listeningServer = app.listen(CONFIG.PORT, () => {
      console.log(
        `Servidor proceso ${pid} escuchando en el puerto ${CONFIG.PORT}`
      );
    });
    listeningServer.on(`error`, (error) =>
      console.log(`Este es el error ${error}`)
    );
  } catch (error) {
    throw error;
  }
}

if (CONFIG.IS_CLUSTER) {
  startServerClustered();
} else {
  startServerForked();
}
