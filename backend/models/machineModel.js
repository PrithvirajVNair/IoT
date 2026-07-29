const mongoose = require("mongoose")

const machineSchema = new mongoose.Schema({
    id:{
        type: String,
        required:true,
        unique:true
    },
    name:{
        type: String,
        required:true,
    },
    status:{
        type: String,
        required:true,
    },
    temperature:{
        type: Number,
        required:true,
    },
    vibration:{
        type: Number,
        required:true,
    },
    is_active:{
        type: Boolean,
        default:true
    },
    lastUpdated:{
        type: Date,
        required:true,
    }
})

const machines = mongoose.model("machines",machineSchema)
module.exports = machines