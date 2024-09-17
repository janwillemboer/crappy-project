import db from "./database.js";

const services = {

    getThing: function (requestID) {

        // delegate doing the db request to the data layer
        const result = db.getCurrentTime(requestID)

        // do some custom handling of the result, this is part of the application/service layer
        if (result.id < 10) {
            result.legacyFlag = true;
        } else {
            result.legacyFlag = false;
        }

        return result;
    },

    getHealth: function () {
        if (!db.getConnected()) {
            throw new Error("No DB connection");
        }
        return "OK";
    }

};

export default services;