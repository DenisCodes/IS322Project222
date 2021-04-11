import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import openDataBase from './JSONapi';

ReactDOM.render(<App />, document.querySelector('#root'));

class App extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            id: 1,
            title: "Install React",
            type: "task",
            column: "done"
        }

        this.getDatabase = this.getDatabase.bind(this);
    }

    componentDidMount(){
        this.getDatabase();
    }

    getDatabase(){
        const id = this.state.id;
        openDataBase.getDataBaseById(id).then(title => {
            this.setState({title})
        })
        openDataBase.getDataBaseById(id).then(type => {
            this.setState({type})
        })
        openDataBase.getDataBaseById(id).then(column => {
            this.setState({column})
        })

    }

}