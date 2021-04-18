import React from "react";
import update from "immutability-helper";
import axios from 'axios';
import App from "./App";



class Page2 extends React.Component {

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

  render() {
      const { tasks, requestSort, sortConfig } = sortData(this.state);
      const getClassNamesFor = (name) => {
          if (!sortConfig) {
              return;
          }
          return sortConfig.key === name ? sortConfig.direction : undefined;
      };

      return (
          <table>
              <caption>Products</caption>
              <thead>
              <tr>
                  <th>
                      <button
                          type="button"
                          onClick={() => requestSort('id')}
                          className={getClassNamesFor('id')}
                      >
                          Price
                      </button>
                  </th>
                  <th>
                      <button
                          type="button"
                          onClick={() => requestSort('title')}
                          className={getClassNamesFor('title')}
                      >
                          In Stock
                      </button>
                  </th>
                  <th>
                      <button
                          type="button"
                          onClick={() => requestSort('type')}
                          className={getClassNamesFor('type')}
                      >
                          In Stock
                      </button>
                  </th>
                  <th>
                      <button
                          type="button"
                          onClick={() => requestSort('status')}
                          className={getClassNamesFor('status')}
                      >
                          In Stock
                      </button>
                  </th>
              </tr>
              </thead>
              <tbody>
              {tasks.map((tasks) => (
                  <tr key={tasks._id}>
                      <td>{tasks.title}</td>
                      <td>${tasks.type}</td>
                      <td>{tasks.status}</td>
                  </tr>
              ))}
              </tbody>
          </table>
      );
  }

}
export default Page2;

const sortData = (tasks, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const itemsSorted = React.useMemo(() => {
        let sortableItem = [...tasks];
        if (sortConfig !== null) {
            sortableItem.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItem;
    }, [tasks, sortConfig]);

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

    return { tasks: itemsSorted, requestSort, sortConfig };
};
/*function filter(filterList){
    switch(filterList){
        case "id":
            const myData = this.state.tasks
                .sort(function(a, b) {
                    if(a._id < b._id ) return -1;
                    if(a._id  > b._id ) return 1;
                    return 0;
                })
                .map((tasks, index) => (
                    <Row>
                        <Col md={"auto"}>{tasks._id}</Col>
                        <Col>{tasks.title}</Col>
                        <Col>{tasks.type} </Col>
                        <Col>{tasks.status}</Col>
                    </Row>
                ))
            return myData;

        case "title":

        case "type":

        case "status":


    }
}*/