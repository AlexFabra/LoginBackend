const mongoose = require("mongoose");

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.BD_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("bdd online");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    dbConnection
}