const { default: mongoose } = require("mongoose")

const URL = "mongodb+srv://username:password@cluster0.hufwee1.mongodb.net/PollingApp?retryWrites=true&w=majority";

const connection =()=>{
    mongoose.connect(URL).then(()=>{
       console.log("Connection Successfully")
    }).catch((error)=>{
       console.log("Error in connection" , error);
    });
}

module.exports = connection;
