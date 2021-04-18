import React from "react";
import update from "immutability-helper";
import axios from 'axios';

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
    const { items, requestSort, sortConfig } = useSortableData(props.tasks);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    console.log(items)
    return (
        <table>
            <caption>Products</caption>
            <thead>
            <tr>
                <th>
                    <button
                        type="button"
                        onClick={() => requestSort('_id')}
                        className={getClassNamesFor('_id')}
                    >
                        ID
                    </button>
                </th>
                <th>
                    <button
                        type="button"
                        onClick={() => requestSort('title')}
                        className={getClassNamesFor('title')}
                    >
                        Title
                    </button>
                </th>
                <th>
                    <button
                        type="button"
                        onClick={() => requestSort('type')}
                        className={getClassNamesFor('type')}
                    >
                        Type
                    </button>
                </th>
                <th>
                    <button
                        type="button"
                        onClick={() => requestSort('status')}
                        className={getClassNamesFor('status')}
                    >
                        Status
                    </button>
                </th>
            </tr>
            </thead>
            <tbody>
            {

                items.map((task, index ) => (
                    task.map((singleTask,i) => (
                        <tr>
                            <td>{singleTask._id}</td>
                            <td>{singleTask.title}</td>
                            <td>{singleTask.type}</td>
                            <td>{singleTask.status}</td>
                        </tr>
                        )

                    )))
            }

            </tbody>
        </table>
    );
};

export default class Page2Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            errorMessage: ''
        };
    }

    componentDidMount(){
        this.getDataBase();
    }

    getDataBase() {
        axios.get('https://my-json-server.typicode.com/DenisCodes/database/tasks')
            .then(response => {
                console.log(response.data);
                this.setState({tasks: response.data});
                console.log(this.state);
            }).catch(error => {
            console.log(error);
            this.setState({errorMessage: error.message});
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
    render(){
        return (
            <div className="App">
                <ProductTable
                    tasks={[
                        this.state.tasks
                    ]}
                />
            </div>
        );
    }

}
