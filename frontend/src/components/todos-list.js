import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { awaitExpression } from '@babel/types';
//<Link to={"/edit/"+currentTodo._id}>&#x2713;</Link>  add this line to table data to do complete action for todo
export default class TodosList extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            todos:[]   //create an array to store data from database to display in this page
        };
    }
    
    componentDidMount(){ //request data base to get data
        axios.get('http://localhost:4000/todos/')
            .then(response => {  //now response variable have data
                this.setState({todos: response.data})  //assign data to the array
            })
            .catch(function(error){
                console.log(error);
            })
    }
    componentDidUpdate(){   //update data when we edit it and come from edit page
        axios.get('http://localhost:4000/todos/')
            .then(response => {  //now response variable have data
                this.setState({todos: response.data})  //assign data to the array
            })
            .catch(function(error){
                console.log(error);
            })
    }
    todoList(){
        return this.state.todos.map(function(currentTodo,i){   //itrate through the array
            return (
                    <tr key={i}>
                        <td className={currentTodo.completed ? 'completed': ''}>{currentTodo.description}</td>
                        <td className={currentTodo.completed ? 'completed': ''}>{currentTodo.responsible}</td>
                        <td className={currentTodo.completed ? 'completed': ''}>{currentTodo.priority}</td>
                        <td>
                            <Link to={"/edit/"+currentTodo._id}>&#x1f589;</Link>
                        </td>
                        <td>
                            <Link to="#" onClick={()=>{
                                const obj = { // create a new obj containing value submitted from form
                                    description:currentTodo.description,
                                    responsible: currentTodo.responsible,
                                    priority:currentTodo.priority,
                                    completed:!currentTodo.completed
                                }
                        
                                axios.post('http://localhost:4000/todos/update/'+currentTodo._id,obj)   //path of database and obj having data to insert
                                    .then(res => console.log(res.data));
                            }}>
                                &#x2713;
                            </Link>
                        </td>
                        <td>
                            <Link to="#" onClick={()=>{
                                // eslint-disable-next-line no-restricted-globals
                                if(!confirm('Are You Sure to Delete the Item \n(index '+i+' , id : '+currentTodo._id+')'))  // return boolean
                                    return;
                                axios.delete('http://localhost:4000/todos/delete/'+currentTodo._id)   //path of database and obj having data to insert
                                .then(res => console.log(res.data));
                            }}>
                                &times;
                            </Link>
                        </td>
                    </tr>  
                )                                       //returning a child component for table that is row of table
        });
    }
    render(){
        return(
            <div>
                <h3>Todo List</h3>
                <table className="table table-striped" style={{marginTop:20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th colSpan="3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
