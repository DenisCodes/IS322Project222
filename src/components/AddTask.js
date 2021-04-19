import React from 'react';
import axios from "axios";
import Kanban from "./Kanban";


class AddTask extends React.Component {

    addNewTask (newTask) {
        console.log(newTask);

    }
// we ned to add this to the database
    // probably I can do it

    onSubmit = (e) => {
        const newTask ={
            title : this.refs.title.value,
            type : this.refs.type.value
        }
        this.addNewTask(newTask);
        this.props.onSubmit(this.state.addNewTask(newTask));
        e.preventDefault();

    }
    render(){

        return (

            <div>
                <form className="task-input form-group" onSubmit={this.onSubmit.bind(this)}>
                    <h2>Add Task</h2>
                    <label htmlFor="title">Enter New Task</label>
                    <input type="text" className="form-control"
                           name="title"
                           ref="title"
                    />

                    <label htmlFor="type">Type</label>
                    <select className="browser-default custom-select" name="type" ref="type">
                        <option>Choose your option</option>
                        <option value="task">Task</option>
                        <option value="debug">Debug</option>
                        <option value="feature">Feature</option>
                    </select>
                    <input type="submit" value="Add Task" className="btn btn-primary"/>
                </form>

            </div>
        );

    }

}


export default AddTask;