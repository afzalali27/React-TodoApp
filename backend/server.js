const express = require('express');
const app = express();  // create instance of expresss
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose= require('mongoose');
const PORT = 4000;
const todoRoutes = express.Router();
let Todo = require('./todo.model');

app.use(cors()); // middleware for cross over communication
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos',{ useNewUrlParser:true});// connect to our data base by providing url and name of database and port no.
const connection = mongoose.connection;   //getting reference of conncetion

connection.once('open', function(){ //open
    console.log('MongoDB Database conncetion established Successfully');
})

todoRoutes.route('/').get(function(req,res){
    Todo.find(function(err,todos){
        if(err){
            console.log(err);
        }else{
            res.json(todos);
        }
    })
});

todoRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Todo.findById(id,function(err,todo){
        res.json(todo);
    });
});
todoRoutes.route('/delete/:id').delete(function(req,res){
    Todo.findByIdAndDelete(req.params.id,function(err,todo){
        if(!todo)
            res.status(404).send('data not found');
        todo.save().then(todo=>{
            res.json('Todo Deleted');
        }).catch(err=>{
            res.status(404).send('Delete not Possible');
        })
    });
});
todoRoutes.route('/add').post(function(req,res){
    let todo = new Todo(req.body);
    todo.save().then(todo=>{
        res.status(200).json({'todo':'todo added successfuly'});
    }).catch(err=>{
        res.status(400).send('adding new todo failed');
    });
});

todoRoutes.route('/update/:id').post(function(req,res){
    Todo.findById(req.params.id,function(err,todo){
        if(!todo)
            res.status(404).send('data is not found');
        else
            todo.description= req.body.description;
            todo.responsible= req.body.responsible;
            todo.priority= req.body.priority;
            todo.completed= req.body.completed;

            todo.save().then(todo=>{
                res.json('Todo updated');
            }).catch(err=>{
                res.status(400).send("Update not Possible");
            });
    });
});

app.use('/todos', todoRoutes); //attach router to todos

app.listen(PORT, function(){  //Start a server at this port
    console.log("Server is running on Port : "+PORT);  // you will see the input when you type nodemon server in terminal to start terminal
});