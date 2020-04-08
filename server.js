const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDatabase = require("./config/database");

dotenv.config({ path: "./config/config.env" });
connectDatabase();
const router = require("./routes/transactions-route");

const app = express();

// Body Parser Middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/transactions-route", router);

// Use Static Folder
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (request, response) => response.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}

const PORT = process.env.PORT || 8828;

app.listen(PORT, console.log(`Benion Server Started: Running On ${ process.env.NODE_ENV } mode On Port ${ PORT }`.yellow.bold));