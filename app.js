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

app.get('/todos',(req,res)=>{
    //res.send('Todos')
    //console.log('Todos')

    let todosString = ''
    for(let i = 0;i<todos.length;i++)
        todosString+=`<h3>ID:${todos[i].id} Title: ${todos[i].title} Description: ${todos[i].description}</h3>`
  
    console.log(todosString)
    res.send(todosString)
    
  // res.json(todos)
})
app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})