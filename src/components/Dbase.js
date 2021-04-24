import React from 'react';
import axios from 'axios';

const base = [];
let firstRun = 0;
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
    if(typeof window.previous === 'undefined'){
        window.previous = [data]
    }
    if(typeof window.tasks === 'undefined'){
        window.tasks = []
    }
    for (var task of data) {
        console.log(task.title)
        console.log(window.tasks)
        if(firstRun === 0){
            window.tasks.push(task);
            window.previous.push(task)
        }else

            if(window.previous.length === data.length){
                console.log('in')
            }else{
                window.tasks.push(task)
                window.previous.push(task)
                console.log('not in');
                console.log(window.tasks);
            }

        }


        /*if (window.tasks.includes(task.title)) {
            console.log('in');
        }
        else{
            window.tasks.push(task);
            console.log('not in');
            console.log(window.tasks);
        }*/


    console.log('First Run Completed')
    firstRun = 1;
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