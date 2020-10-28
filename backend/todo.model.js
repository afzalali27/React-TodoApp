// creating database model for our database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({ //create schema for database
    description:{  //col name of database
        type: String
    },
    responsible:{
        type: String //datatype of col
    },
    priority:{
        type: String
    },
    completed:{
        type: Boolean
    }
});

module.exports= mongoose.model('Todo', Todo); //export our data base 1st arg is name(can be any) and 2nd is designed schema to be export