const express = require('express')
const cors = require('cors');
const app = express()
const connection = require('./connection')
// app.use(cors());
//Establish connection
connection();


// Set up server to accept json
app.use(express.json())

//Set up routes
const questionRouter = require('./routes/questionRouter')
const optionRouter = require('./routes/optionRouter')

app.use('/api', questionRouter)
app.use('/api', optionRouter)



app.listen(1234, (error)=> {
    if(error){
        console.log(error);
    }

    else{
        console.log("server started and running at 1234");
    }
})
