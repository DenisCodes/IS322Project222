import React from 'react';

const TaskItem = props => {
    return(
        <li className="list-group-item">
            {props.task.title}
            <button type="button"
                    onClick={() => props.markDone(props.task)}
                    className="btn btn-primary" style={ {float: 'right'}}>
                done
            </button>
        </li>
    )
};

export default TaskItem;