const express = require('express');
const router = express.Router();
const Task = require('../models/task');


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
router.post('/todos',async (req,res,next)=>{

    try{
    const {title,description,completed} = req.body

    //Ensure that the title field is required and is a string
    if(!title || typeof title !== 'string')
    {
        console.log('Invalid Title. This is required and must be a string')
        throw new CustomError('Invalid Title. This is required and must be a string',400);
    }

    //Validate that the Completed field is a boolean
    /*
    if( completed === undefined || typeof completed !== 'Boolean')
    {
        console.log('Completed field should be boolean')
        //return res.status(401).send('Completed field should be boolean')
        throw new CustomError('Completed field should be boolean',400);
    }*/
    
    //Ensure the title has a maximum length of 100 characters.
    if(title.length>100)
    {
            console.log("Title should less than 100 characters")
           //return res.status(402).send('Title should less than 100 characters')
           throw new CustomError('Title should less than 100 characters',400);
    }
    
    const task = new Task({title,description});
    const savedTask = await task.save();

    res.status(201).json(savedTask)
    }
    catch(error)
    {
        next(error) //Pass the error to global error-handling middleware
    }
})

// Fetch all to-dos
router.get('/todos',async(req,res,next)=>{
    try{
      const task = await Task.find();
      console.log(task);
      res.status(201).json(task);
    }
    catch(error)
    {
        next(error) //Pass the error to the global error-handling middleware 
    }
})

// Fetch a single to-do by its ID
router.get('/todos/:id',async (req,res,next)=>{
    try{
    const task = await Task.findById(req.params.id);
    if(!task)
    {
        //return res.status(404).send(`<h2>${id} is not found</h2>`)
        throw new CustomError(`Todo with id${req.params.id} not found`,404)
    }
    console.log(task);
    res.status(201).json(task);
    }
    catch(error)
    {
        next(error) //pass the error to the error handling middleware
    }

})

//updating existing todo
router.put('/todos/:id',async (req,res,next)=>{
    try{
    console.log("Request headers:", req.headers); // Log headers to check Content-Type
    console.log("Request body:", req.body);       // Log request body

    const task = await Task.findById(req.params.id);

    if(!task) {
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
    /*
    if( completed === undefined || typeof completed !== 'boolean')
    {
        console.log('Completed field should be boolean')
        //return res.status(401).send('Completed field should be boolean')
        throw new CustomError('Completed field should be boolean',400);
    }
        */
    
    //Ensure the title has a maximum length of 100 characters.
    if(title.length>100)
    {
            console.log("Title should less than 100 characters")
            throw new CustomError('Title should less than 100 characters',400);
            //return res.status(402).send('Title should less than 100 characters')

    }
   
    const updatedtask = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
    console.log(updatedtask);
    res.status(200).json(updatedtask);
    }
    catch(error)
    {
        next(error) //Pass the error to the eroor-handling middleware
    }
});

//Delete a to-do by its ID
router.delete('/todos/:id',async (req,res,next)=>{
    try{
    
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) {
        //return res.status(404).send(`<h2>${id} is not found</h2>`)
        console.log(`${req.params.id} is not found`);
        throw new CustomError(`${req.params.id} is not found`,404);
    }
    
    res.status(200).send('Deleted')
    console.log('Deleted')
    }catch(err)
    {
        next(err); //Pass the error to error handling middleware.
    }
})

module.exports = router;