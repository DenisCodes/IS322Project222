import React from 'react';

import PageTabs from './PageTabs';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

class App extends React.Component {
  state = {
    view: 'page1'
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
      case 'page1':
        return (this.wrapPage(
          <Page1 />
        ));
      case 'page2':
        return (this.wrapPage(
          <Page2 />
        ));
      case 'page3':
        return (this.wrapPage(
          <Page3 />
        ));
      default:
        return (this.wrapPage(
          <h2>Invalid Tab, choose another</h2>
        ));
    }

  }
}

export default App;