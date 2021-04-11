import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import axios from 'axios';

ReactDOM.render(<App />, document.querySelector('#root'));

class Tasks extends React.Component{

    state = {
        tasks: [],
        errorMessage: ''
    }



    componentDidMount(){
        this.getData();
    }

    getData() {
        axios.get('https://my-json-server.typicode.com/DenisCodes/database/tasks')
            .then(responce => {
                this.setState({tasks: response.data});
            }).catcch(error => {
                this.setState({errorMEssage: error.message});
        });
    }

    onAddTask = (taskName) => {
        let tasks = this.state.tasks;
        tasks.push({
            title: taskName,
            id: this.state.tsks.length + 1,
            type: 'task',
            coloumn: 'todo'
        });

        this.setState({tasks});
    }

    onUpdateTaskList = (newTaskList) => {
        this.setState({tasks: newTaskList});
    }

}