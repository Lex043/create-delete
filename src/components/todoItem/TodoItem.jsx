import { AiOutlineDelete } from "react-icons/ai";

import "./TodoItem.scss";

const TodoItem = ({ fetchError, todos, handleDelete }) => {
  return (
    <div className="todo__cont">
      {fetchError && <p>{fetchError}</p>}
      {todos && (
        <div>
          {todos.map((todo) => (
            <div className="todo" key={todo.id}>
              <span>
                <input type="radio" />
              </span>
              <p>{todo.task}</p>
              <span>
                <AiOutlineDelete onClick={() => handleDelete(todo.id)} />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
