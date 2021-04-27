import React from "react";
import { DragDropContext, DropTarget, DragSource } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import axios from 'axios';
import Dbase from './Dbase.js';
import AddTask from "./AddTask";

const tasks = window.task;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const channels = [ "new", "ip", "review", "done"];
const labelsMap = {
    new: "To Do",
    ip: "In Progress",
    review: "Review",
    done: "Done"
};

const classes = {
    board: {
        display: "flex",

        width: "90vw",
        fontFamily: 'Arial, "Helvetica Neue", sans-serif'
    },
    column: {
        minWidth: 200,
        width: "18vw",
        height: "80vh",
        margin: "0 auto",
        backgroundColor: "#4950a0"
    },
    columnHead: {
        textAlign: "center",
        padding: 10,
        fontSize: "1.2em",
        backgroundColor: "#787a98"
    },
    item: {
        padding: 10,
        margin: 10,
        fontSize: "0.8em",
        cursor: "pointer",
        backgroundColor: "white"
    }
};

class Kanban extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            errorMessage: ''
        };
    }
    componentDidMount(){
        this.getDataBase();
        //this.getState();
    }

    getState(){
        this.setState({tasks: window.tasks});
    }
/*
    getDataBase() {
        Dbase.setData()
        //Dbase.data
        console.log(window.tasks);
        for(var task of window.tasks){
            console.log(task);
        }
        console.log(Dbase.data);
        console.log(Dbase.getDatabase);
        //await delay(500);
        console.log(tasks);
        console.log(this.state.tasks);
        console.log(this.state);
    }

*/
    getDataBase() {
        axios.get('https://my-json-server.typicode.com/DenisCodes/database/tasks')
            .then(response => {
                console.log(response.data);
                console.log(window.tasks);
                Dbase.checkAdd(response.data);
                this.setState({tasks: window.tasks});
                console.log(this.state);
            }).catch(error => {
            console.log(error);
            this.setState({errorMessage: error.message});
        });
    }
    onAddTask = (taskTitle, taskType) => {

        let tasks = this.state.tasks;
        tasks.push({
            title: taskTitle,
            id: this.state.tasks.length +1,
            type: taskType,
            column: 'todo'

        });

}
    update = (id, status) => {
        const { tasks } = this.state;
        const task = tasks.find(task => task._id === id);
        task.status = status;
        const taskIndex = tasks.indexOf(task);
        const newTasks = update(tasks, {
            [taskIndex]: { $set: task }
        });
        this.setState({ tasks: newTasks });
    };

    render() {
        const { tasks } = this.state;
        return (

            <main>

                <h2 > Task Board </h2>
                <section style={classes.board}>
                    {channels.map(channel => (
                        <KanbanColumn status={channel}>
                            <div style={classes.column}>
                                <div style={classes.columnHead}>{labelsMap[channel]}</div>
                                <div>
                                    {tasks
                                        .filter(item => item.status === channel)
                                        .map(item => (
                                            <KanbanItem id={item._id} onDrop={this.update}>
                                                <div style={classes.item}>{item.title}
                                                     <p> Type :
                                                    {item.type}
                                                     </p>
                                                </div>


                                            </KanbanItem>
                                        ))}
                                </div>
                            </div>
                        </KanbanColumn>
                    ))}
                </section>
            </main>
        );
    }
}

export default DragDropContext(HTML5Backend)(Kanban);

// Column

const boxTarget = {
    drop(props) {
        return { name: props.status };
    }
};

class KanbanColumn extends React.Component {
    render() {
        return this.props.connectDropTarget(<div>{this.props.children}</div>);
    }
}

KanbanColumn = DropTarget("kanbanItem", boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(KanbanColumn);

// Item

const boxSource = {
    beginDrag(props) {
        return {
            name: props.id
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        if (dropResult) {
            props.onDrop(monitor.getItem().name, dropResult.name);
        }
    }
};

class KanbanItem extends React.Component {
    render() {
        return this.props.connectDragSource(<div>{this.props.children}</div>);
    }
}

KanbanItem = DragSource("kanbanItem", boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))(KanbanItem);
