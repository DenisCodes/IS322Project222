import React from 'react';
import axios from 'axios';

const base = [];

const getDatabase = //fetch('https://my-json-server.typicode.com/DenisCodes/database/tasks')
    //.then(response => response.json())
    //.then(datas => datab(datas));
   axios.get('https://my-json-server.typicode.com/DenisCodes/database/tasks')
    .then(response => {
        return response.data;
    });

//function datab(dataz) {return dataz};

const data = getDatabase;

function setData() {
    window.tasks = getDatabase;
}

function checkAdd(data) {
    console.log(typeof window.tasks)
    console.log(window.tasks)
    if(typeof window.tasks === 'undefined'){
        window.tasks = []
    }
    for (var task of data) {
        if (window.tasks.includes(task)) {
            console.log('in');
        }
        else{
            window.tasks.push(task);
            console.log('not in');
            console.log(window.tasks);
        }
    }
}

function addNewTask(newTask) {
    console.log(newTask);
    console.log(newTask.title);
    console.log(newTask.type);
    window.tasks.push({
        _id: window.tasks.length +1,
        title: newTask.title,
        type: newTask.type,
        status: 'todo'
    });
    console.log(window.tasks);
}
export default {
    data, checkAdd, getDatabase,setData, addNewTask
}