const express = require("express");
const cors = require("cors");
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/build')));

app.use(cors({
    // origin: "http://localhost:3000",
    // methods: ["GET", "POST"],
    credentials: true,
}));


mongoose.set('strictQuery', true);
// Mongoose
const db = require("./app/models");
const Role = db.role;
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://lyncare:fls2022@lyncare.5ip2vsa.mongodb.net/junggok?retryWrites=true&w=majority'
const PORT = process.env.PORT || 8080

db.mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server Start');
        });
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

// routes
require('./app/routes/reservation.routes')(app);

//
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});