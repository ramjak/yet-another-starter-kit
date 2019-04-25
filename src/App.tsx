import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes';
import store from './store';

class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
