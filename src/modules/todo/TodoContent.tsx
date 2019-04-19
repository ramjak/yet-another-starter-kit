import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../logo.svg';
import { ITodoStructure } from './data/models/ITodo';
import todo, { ITodoStore } from './data/slices/todos';
import styles from './TodoContent.module.scss';

interface IPropsType {
  todos: ITodoStore;
  createTodo(): void;
  deleteTodo(todo: ITodoStructure): void;
  toggleTodo(oldVal: ITodoStructure, newVal: ITodoStructure): void;
}

class TodoContent extends Component<IPropsType> {
  constructor(props: Readonly<IPropsType>) {
    super(props);
  }

  private toggleTodoValue(todo: ITodoStructure) {
    const newTodo = todo.set('isDone', !todo.get('isDone'));
    this.props.toggleTodo(todo, newTodo);
  }

  private deleteTodo(todo: ITodoStructure) {
    this.props.deleteTodo(todo);
  }

  public render() {
    const { todos, createTodo } = this.props;

    return (
      <header className={styles['App-header']}>
        <img src={logo} className={styles['App-logo']} alt="logo" />
        <button onClick={createTodo}>Click!</button>
        {todos.valueSeq().map((todo, i) => (
          <div key={i}>
            <input
              type="checkbox"
              checked={todo.get('isDone')}
              onClick={this.toggleTodoValue.bind(this, todo)}
            />{' '}
            &nbsp;
            {todo.get('task')} &nbsp;
            <button onClick={this.deleteTodo.bind(this, todo)}>delete</button>
          </div>
        ))}
      </header>
    );
  }
}

const mapStateToProps = (state: any) => ({
  todos: state.todo
});

const mapDispatchToProps = {
  createTodo: () =>
    todo.actions.create({ isDone: false, task: Math.random().toString() }),
  deleteTodo: todo.actions.delete,
  toggleTodo: (oldVal: ITodoStructure, newVal: ITodoStructure) =>
    todo.actions.update({ oldTodo: oldVal, newTodo: newVal })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoContent);
