import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import TaskList from './TaskList';
import AddTask from './AddTask';

ReactDOM.render(<App />, document.querySelector('#root'));

class App extends React.Component{

    state = {
        tasks: [],
        errorMessage: ''
    }

    componentDidMount(){
        this.getData();
    }

    getData() {
        axios.get('https://my-json-server.typicode.com/DenisCodes/database/tasks')
            .then(response => {
                this.setState({tasks: response.data});
            }).catch(error => {
                this.setState({errorMessage: error.message});
        });
    }

    onAddTask = (taskName) => {
        let tasks = this.state.tasks;
        tasks.push({
            title: taskName,
            id: this.state.tasks.length + 1,
            type: 'task',
            coloumn: 'todo'
        });

        this.setState({tasks});
    }

    onUpdateTaskList = (newTaskList) => {
        this.setState({tasks: newTaskList});
    }

    render(){
        return(
            <div calssName='container'>
                <AddTask onSubmit={this.onAddTask} />
                <TaskList task={this.state.tasks} onUpdateTaskList={this.onUpdateTaskList} />
            </div>
        );
    }
}

export default App;