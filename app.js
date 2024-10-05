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

    //Ensure that the title field is required and is a string
    if(!title || typeof title !== 'string')
    {
        console.log('Inavlid title')
        return res.status(401).send('Invalid title')
    }

    //Validate that the Completed field is a boolean
    if( completed === undefined || typeof completed !== 'boolean')
    {
        console.log('Completed field should be boolean')
        return res.status(401).send('Completed field should be boolean')
    }
    
    //Ensure the title has a maximum length of 100 characters.
    if(title.length>100)
    {
            console.log("Title should less than 100 characters")
           return res.status(402).send('Title should less than 100 characters')
    }
    
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

// Fetch all to-dos
app.get('/todos',(req,res)=>{
    let todosString = ''
    for(let i = 0;i<todos.length;i++)
        todosString+=`<h3>ID:${todos[i].id} Title: ${todos[i].title} Description: ${todos[i].description}</h3>`
  
    console.log(todosString)
    res.send(todosString)
})

// Fetch a single to-do by its ID
app.get('/todos/:id',(req,res)=>{
    const id = parseInt(req.params.id); // Parsing params id into integer
    const todo = todos.find(t=>t.id === id )  //fetching mentioned id record from todos
    if(!todo)
    {
        return res.status(404).send(`<h2>${id} is not found</h2>`)
    }
    res.send(`<h3>ID:${todo.id} Title: ${todo.title} Description: ${todo.description}</h3>`)
    console.log(`<h3>ID:${todo.id} Title: ${todo.title} Description: ${todo.description}</h3>`)

})

//updating existing todo
app.put('/todos/:id',(req,res)=>{
    console.log("Request headers:", req.headers); // Log headers to check Content-Type
    console.log("Request body:", req.body);       // Log request body

    const id = parseInt(req.params.id)
    const todo = todos.find(t => t.id === id)

    if(!todo) {
        return res.status(404).send(`<h2>${id} is not found</h2>`)
    }

    const {title, description, completed} = req.body;

    //Ensure that the title field is required and is a string
    if(!title || typeof title !== 'string')
    {
        console.log('Inavlid title')
        return res.status(401).send('Invalid title')
    }

    //Validate that the Completed field is a boolean
    if( completed === undefined || typeof completed !== 'boolean')
    {
        console.log('Completed field should be boolean')
        return res.status(401).send('Completed field should be boolean')
    }
    
    //Ensure the title has a maximum length of 100 characters.
    if(title.length>100)
    {
            console.log("Title should less than 100 characters")
            return res.status(402).send('Title should less than 100 characters')
    }
     
    todo.title = title;
    todo.description = description;
    todo.completed = completed;
    res.status(200).send("Updated");
    console.log(`Updated`);
});


//Delete a to-do by its ID
app.delete('/todos/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const todo = todos.find(t => t.id === id)

    if(!todo) {
        return res.status(404).send(`<h2>${id} is not found</h2>`)
    }
    
    // Filter the todos array to exclude the to-do with the given ID
    todos = todos.filter(t => t.id !== id)
    res.status(200).send('Deleted')
    console.log('Deleted')
})

//If url is not found
app.get('*',(req,res)=>{
    res.status(404).send(`Resource not found</h4>`)
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