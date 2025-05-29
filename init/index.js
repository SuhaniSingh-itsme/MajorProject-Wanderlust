const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner:"683863b89b831dc93daa611b"
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();

