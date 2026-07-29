const mongoose = require("mongoose");

const connectionString = process.env.DATABASE;

mongoose.connect(connectionString).then(() => {
    console.log("MongDB Connected Successfully");
}).catch((err) => {
    console.log(err);
})  