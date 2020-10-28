import React, {Component} from 'react';    //{Componet} means we dont need to extend react.component just write extends component
import axios from 'axios';
export default class CreateTodo extends Component {
    constructor(props){
        super(props);

        this.onChangeDescreption= this.onChangeDescreption.bind(this);
        this.onChangeResponsible= this.onChangeResponsible.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
        this.state={
            description:'',
            responsible:'',
            priority:'',
            completed:false
        }
    }
    onChangeDescreption(e){
        this.setState({
            description:e.target.value
        });
    }
    onChangeResponsible(e){
        this.setState({
            responsible:e.target.value
        });
    }
    onChangePriority(e){
        this.setState({
            priority:e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();
        console.log('Form Submitted');
        console.log('Tode Descreption: '+this.state.description);
        console.log('Tode Descreption: '+this.state.responsible);
        console.log('Tode Descreption: '+this.state.priority);
        console.log('Tode Descreption: '+this.state.completed);

        const newTodo = { // create a new obj containing value submitted from form
            description:this.state.description,
            responsible: this.state.responsible,
            priority:this.state.priority,
            completed:this.state.completed
        }

        axios.post('http://localhost:4000/todos/add',newTodo)   //path of database and obj having data to insert
            .then(res => console.log(res.data));

        //after submission clear the text fields for new data
        this.setState({
            description:'',
            responsible:'',
            priority:'',
            completed:false
        })
    }
    render(){
        return(
            <div style={{marginTop: 20}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Descreption</label>
                        <input type="text" className="form-control" value={this.state.description} onChange={this.onChangeDescreption}/>
                    </div>
                    <div className="form-group">
                        <label>Responsible</label>
                        <input type="text" className="form-control" value={this.state.responsible} onChange={this.onChangeResponsible}/>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityLow" value="Low" checked={this.state.priority==='Low'} onChange={this.onChangePriority} />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityMedium" value="Medium" checked={this.state.priority==='Medium'} onChange={this.onChangePriority} />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityHigh" value="High" checked={this.state.priority==='High'} onChange={this.onChangePriority} />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Tode" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
