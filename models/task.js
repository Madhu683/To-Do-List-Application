const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{ type:String, required:true},
    description:{type:String, required:true},
    completed:{type:Boolean, default:false}
})

const task = mongoose.model('task',userSchema);

module.exports = task;