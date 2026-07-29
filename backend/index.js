require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/dBConnection")
const router = require("./router/routes");

const server = express();

server.use(express.json());
server.use(cors());
server.use(router);

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

server.get("/", (req, res) => {
    res.send(`<h1>Server is running</h1>`)
})


