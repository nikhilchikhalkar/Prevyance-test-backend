const mongoose = require("mongoose")

const connectDB = async () =>{
    const DB = process.env.DB_URL
    try {
        await mongoose.connect(DB)
        console.log('mongodb database connected');
    } catch (error) {
        console.log(`error while db connection ${error}`);
    }
}

module.exports = connectDB;