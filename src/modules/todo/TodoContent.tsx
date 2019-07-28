import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../logo.svg';
import { rootReducerStateType } from '../../store';
import { ITodoStructure } from './data/models/ITodo';
import todo from './data/slices/todos';
import styles from './TodoContent.module.scss';

const mapStateToProps = (state: rootReducerStateType) => ({
  todos: state.todo
});

const mapDispatchToProps = {
  createTodo: () =>
    todo.actions.create({ isDone: false, task: Math.random().toString() }),
  deleteTodo: todo.actions.delete,
  toggleTodo: (oldVal: ITodoStructure, newVal: ITodoStructure) =>
    todo.actions.update({ oldObj: oldVal, newObj: newVal })
};

type dispatchPropsType = typeof mapDispatchToProps;

// using typeof means that this component is tightly coupled with its action counterpart
// also using this means, we're violating DIP:
// "Depend upon abstractions. Do not depend upon concrete classes."
// todo: using action interface is better
interface IProps
  extends ReturnType<typeof mapStateToProps>,
    dispatchPropsType {}

class TodoContent extends Component<IProps> {
  constructor(props: Readonly<IProps>) {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoContent);
