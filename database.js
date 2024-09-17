import pg from "pg";

let client;
let connected;

const db = {
    connect: function (conn) {
        client = new pg.Client(conn);

        client.connect((err) => {
            connected = !err;
            if (err) {
                console.log("Error connecting to DB");
                console.error(err);
            } else {
                console.log("Connected to DB");
            }
        });
    },
    getConnected: function() { return connected; },
    getCurrentTime: async function(requestID) {
        var dbResult = await client.query("SELECT NOW() AS time, $1 AS id", [requestID]);
        return dbResult.rows[0];
    }
};

export default db;