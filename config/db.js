const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
        });
        console.log(`Mongodb connected ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

module.exports = connectDB;