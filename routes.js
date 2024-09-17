import services from "./services.js";

function doRouting(server) {
    server.get("/things/:thing_id", async (req, repl) => {
        // validating the request is part of the api layer (the controller or routes)
        const requestID = req.params.thing_id;
        if (!requestID) {
            throw new { message: "Invalid request", statusCode: 400 };
        }
    
        // delegate the rest to the service layer
        return services.getThing(requestID);
    });
    
    server.get("/health", async (req, repl) => {
        // delegate to the service layer
        return services.getHealth();
    });
}

export default {
    init: doRouting
}; 