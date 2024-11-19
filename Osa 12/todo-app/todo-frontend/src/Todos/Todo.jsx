import React from 'react'

const Todo = ({ todo }) => (
  <div className='todo-item'>
    <p>{todo.text}</p>
  </div>
)

export default Todo
