import { useEffect, useState } from "react";
import { TodoContext, useTodo } from "./contexts/TodoContext.js";
import TodoForm from "./components/TodoForm.jsx";
import TodoItem from "./components/TodoItem.jsx";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todoMsg) => {
    setTodos((prevTodos) => {
      const newTodo = {
        id: Date.now(),
        title: todoMsg,
        completed: false,
      };

      return [newTodo, ...prevTodos];
    });
  };

  const updateTodo = (id, todoMsg) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, title: todoMsg } : prevTodo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };


  //load Todos when application first runs
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')); //let todos be the key corresponding to The 'Todos Array'

    //just todos.length check will crash the app if the array does not exist, that's why todos && todos.length
    if(storedTodos && storedTodos.length > 0){
      setTodos(storedTodos);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleCompleted }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            <ul className="w-full">
              {todos.map((todo) => {
                return (
                  <li className = 'mb-2' key={todo.id}>
                    <TodoItem todo={todo} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
