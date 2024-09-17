import fastify from "fastify";
import pg from "pg";

// to remember you how to do imports in nodejs
import otherModule from "./other-module.js"; 
// this is a method call on the imported module, it only logs some random message.
otherModule.hi();

// the app needs a postgres database, set the connection parameters as below 
// or specify different parameters using the command line or change below
const conn = {
    host: process.env.PG_HOST || "localhost",
    port: process.env.PG_PORT || 5432,
    user: process.env.PG_USER || "node_user",
    password: process.env.PG_PASSWORD || "lamp window lemming",
    database: process.env.PG_DB || "NodeDB"
};

// port the server listens on
const PORT = process.env.PORT || 3000;

const server = fastify();

let dbConnected = false;
const client = new pg.Client(conn);

client.connect((err) => {
    dbConnected = !err;
    if (err) {
        console.log("Error connecting to DB");
        console.error(err);
    } else {
        console.log("Connected to DB");
    }
});

server.get("/things/:thing_id", async (req, repl) => {
    const requestID = req.params.thing_id;
    if (!requestID){
        throw new {message: "Invalid request", statusCode: 400};
    }

    var dbResult = await client.query("SELECT NOW() AS time, $1 AS id", [requestID]);
    const result = dbResult.rows[0];

    // do some custom handling of the result
    if (result.id < 10) {
        result.legacyFlag = true;
    } else {
        result.legacyFlag = false;
    }

    return result;
});

server.get("/health", async (req, repl) => {
    if (!dbConnected) {
        throw new Error("No DB connection");
    }
    return "OK";
});

server.listen({ port: PORT }, () => console.log(`Listening at http://localhost:${PORT}`));

// this is a method call on the imported module, it only logs some random message
otherModule.bye();
