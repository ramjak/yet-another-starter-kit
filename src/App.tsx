import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes';
import { DependencyContextProvider } from './services/DependencyContext';
import ServiceFactory from './services/ServiceFactory';
import store from './store';

class App extends Component<{}, {}> {
  public render() {
    const serviceFactory = new ServiceFactory();

    return (
      <Provider store={store}>
        <DependencyContextProvider value={serviceFactory}>
          <Router>
            <Switch>
              {routes.map((route, i) => (
                <Route key={i} {...route} />
              ))}
            </Switch>
          </Router>
        </DependencyContextProvider>
      </Provider>
    );
  }
}

export default App;
