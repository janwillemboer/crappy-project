import fastify from "fastify";
import db from "./database.js";
import routes from "./routes.js";

// needs a postgres database, set the connection parameters as below 
// or specify different parameters using the command line or change below
const conn = {
    host: process.env.PG_HOST || "localhost",
    port: process.env.PG_PORT || 5432,
    user: process.env.PG_USER || "postgres",
    password: process.env.PG_PASSWORD || "lamp window lemming",
    database: process.env.PG_DB || "NodeDB"
};

// port the server listens on
const PORT = process.env.PORT || 3000;

// init database connection
db.connect(conn);

// init fastify http server
const server = fastify();

// delegate routing to the api/routing/controller layer
routes.init(server);

// start listening
server.listen({ port: PORT }, () => console.log(`Listening at http://localhost:${PORT}`));