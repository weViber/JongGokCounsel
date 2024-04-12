const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Reservation = mongoose.model(
  "Reservation",
  new mongoose.Schema({
    // _id : ObjectId,
    name : String,
    password : String,
    phone : String,
    reqdate : Number,
    resdate : Number,
    option : String,
    text : String,
    RVstatus : String
  })
);

module.exports = Reservation;