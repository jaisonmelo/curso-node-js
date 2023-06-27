import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => console.log("Conexão com o banco feita com sucesso"));
const app = express();
routes(app);
app.use(manipulador404);
// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);

export default app;

/*
MongoDB
url: https://cloud.mongodb.com/v2/6487c1d86a5a491c098d4402#/metrics/replicaSet/6487c26ce977b533a7c26561/explorer/alura-node/livros/find
user: jaisonprocer
senha: VxKFjlcx3CGpH1ao
*/
