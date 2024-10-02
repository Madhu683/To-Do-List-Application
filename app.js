const express = require('express')
const app = express()
app.use(express.json());

let todos = []

// creating a new todo
app.post('/todos',(req,res)=>{
    const {title,description,completed} = req.body
    console.log(req.body)
    const newtodo = {
        id:todos.length + 1,
        title,
        description,
        completed: completed || 'false'
    }

    todos.push(newtodo)
    console.log(todos)

    res.status(201).json(todos)
})

app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})