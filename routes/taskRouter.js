const express = require('express');
const router = express.Router();

// Middleware to parse JSON
router.use(express.json());


//Custom Error class
class CustomError extends Error {
    constructor(message,statusCode) {
        super(message)
        this.status = statusCode
    }
}

// creating a new todo
router.post('/todos',(req,res,next)=>{

    try{
    const {title,description,completed} = req.body

    //Ensure that the title field is required and is a string
    if(!title || typeof title !== 'string')
    {
        console.log('Invalid Title. This is required and must be a string')
        throw new CustomError('Invalid Title. This is required and must be a string',400);
    }

    //Validate that the Completed field is a boolean
    if( completed === undefined || typeof completed !== 'boolean')
    {
        console.log('Completed field should be boolean')
        //return res.status(401).send('Completed field should be boolean')
        throw new CustomError('Completed field should be boolean',400);
    }
    
    //Ensure the title has a maximum length of 100 characters.
    if(title.length>100)
    {
            console.log("Title should less than 100 characters")
           //return res.status(402).send('Title should less than 100 characters')
           throw new CustomError('Title should less than 100 characters',400);
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
    }
    catch(error)
    {
        next(error) //Pass the error to global error-handling middleware
    }
})

// Fetch all to-dos
router.get('/todos',(req,res,next)=>{
    try{
    let todosString = ''
    for(let i = 0;i<todos.length;i++)
        todosString+=`<h3>ID:${todos[i].id} Title: ${todos[i].title} Description: ${todos[i].description}</h3>`
  
    console.log(todosString)
    res.send(todosString)
    }
    catch(error)
    {
        next(error) //Pass the error to the global error-handling middleware 
    }
})

// Fetch a single to-do by its ID
router.get('/todos/:id',(req,res,next)=>{
    try{
    const id = parseInt(req.params.id); // Parsing params id into integer
    const todo = todos.find(t=>t.id === id )  //fetching mentioned id record from todos
    if(!todo)
    {
        //return res.status(404).send(`<h2>${id} is not found</h2>`)
        throw new CustomError(`Todo with id${id} not found`,404)
    }
    res.send(`<h3>ID:${todo.id} Title: ${todo.title} Description: ${todo.description}</h3>`)
    console.log(`<h3>ID:${todo.id} Title: ${todo.title} Description: ${todo.description}</h3>`)
    }
    catch(error)
    {
        next(error) //pass the error to the error handling middleware
    }

})

//updating existing todo
router.put('/todos/:id',(req,res)=>{
    try{
    console.log("Request headers:", req.headers); // Log headers to check Content-Type
    console.log("Request body:", req.body);       // Log request body

    const id = parseInt(req.params.id)
    const todo = todos.find(t => t.id === id)

    if(!todo) {
        //return res.status(404).send(`<h2>${id} is not found</h2>`)
        throw new CustomError(`Todo with id${id} not found`,404)
    }

    const {title, description, completed} = req.body;

    //Ensure that the title field is required and is a string
    if(!title || typeof title !== 'string')
    {
        console.log('Invalid Title. This is required and must be a string')
        throw new CustomError('Invalid Title. This is required and must be a string',400);
    }

    //Validate that the Completed field is a boolean
    if( completed === undefined || typeof completed !== 'boolean')
    {
        console.log('Completed field should be boolean')
        //return res.status(401).send('Completed field should be boolean')
        throw new CustomError('Completed field should be boolean',400);
    }
    
    //Ensure the title has a maximum length of 100 characters.
    if(title.length>100)
    {
            console.log("Title should less than 100 characters")
            throw new CustomError('Title should less than 100 characters',400);
            //return res.status(402).send('Title should less than 100 characters')

    }
     
    todo.title = title;
    todo.description = description;
    todo.completed = completed;
    res.status(200).send("Updated");
    console.log(`Updated`);
    }
    catch(error)
    {
        next(error) //Pass the error to the eroor-handling middleware
    }
});

//Delete a to-do by its ID
router.delete('/todos/:id',(req,res)=>{
    try{
    const id = parseInt(req.params.id)
    const todo = todos.find(t => t.id === id)

    if(!todo) {
        //return res.status(404).send(`<h2>${id} is not found</h2>`)
        console.log(`${id} is not found`);
        throw new CustomError(`${id} is not found`,404);
    }
    
    // Filter the todos array to exclude the to-do with the given ID
    todos = todos.filter(t => t.id !== id)
    res.status(200).send('Deleted')
    console.log('Deleted')
    }catch(err)
    {
        next(err); //Pass the error to error handling middleware.
    }
})

module.exports = router;