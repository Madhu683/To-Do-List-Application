const express = require('express');
const mongoose = require('mongoose');
const taskRouter = require('./routes/taskRouter');
const app = express();

//Middleware to parse JSON
app.use(express.json());

const uri = "mongodb+srv://madhukandukuri419:PGqZjrKATVLRUEJd@cluster0.n9hfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//Conection of MongoDB
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
                 .then(()=>console.log('MongoDB is connected successfully'))
                 .catch((err)=>console.log('MongoDB connection is failed:',err))


//Middleware to use routers
app.use('/',taskRouter)

//If url is not found
app.get('*',(req,res)=>{
    res.status(404).send(`Resource not found`)
})

//Error-handling middleware
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(err.status || 500).json({
        success:false,
        message:err.message || "Internal Server Error"
    })
})

app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})