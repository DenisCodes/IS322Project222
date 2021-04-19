import React from 'react';

import PageTabs from './PageTabs';
import Page2 from './Page2Test';

import Kanban from "./Kanban";
import AddTask from "./AddTask";

class App extends React.Component {
  state = {
    view: 'kanban'
  }
  
  onViewChange(view) {
    this.setState({ view });
  }

  wrapPage(jsx) {
    const { view } = this.state;
    return (
      <div className="container">
        <PageTabs currentView={view}
                  onViewChange={this.onViewChange.bind(this)}/>
        {jsx}
      </div>
    );
  }

  render() {
    const { view } = this.state;

    switch (view) {
      case 'kanban':
        return (this.wrapPage(
          <Kanban />
        ));
      case 'page2':
        return (this.wrapPage(
          <Page2 />
        ));
      case 'addtask':
        return (this.wrapPage(
          <AddTask />
        ));
      default:
        return (this.wrapPage(
          <h2>Invalid Tab, choose another</h2>
        ));
    }

  }
}

export default App;