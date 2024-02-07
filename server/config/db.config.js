import mongoose from "mongoose";
import { URI } from "./variables.config.js";

// connection to mongodb
(async function () {
    try {
        const options = {
            dbName: "invoice-generator"
        };
        await mongoose.connect(URI, options);
        console.log("Database is connected successfully.");
    } catch (error) {
        console.error(error.message);
    }
})();
