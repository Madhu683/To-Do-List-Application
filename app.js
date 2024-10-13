const express = require('express')
const app = express()
app.use(express.json());

let todos = [
    {
    id:1,
    title: 'Create a method',
    description: ' Create a method to perform add operation in that function',
    completed: 'false'
    },
    {id:2,
        title: 'Create a method',
        description: ' Create a method to perform add operation in that function',
        completed: 'false'
    }
]

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