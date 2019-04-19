import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styles from './App.module.scss';
import TodoContent from './modules/todo/TodoContent';
import store from './store';

class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <div className={styles.App}>
          <TodoContent />
        </div>
      </Provider>
    );
  }
}

export default App;
