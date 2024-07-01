import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {

  const {addTodo} = useTodo();

  const [text, setText] = useState("");
  
  const handleSubmit = (e) => {
    
    console.log("Submitted todo is ", e.target[0].value);

    if(e.target[0].value === '') return;
    addTodo(e.target[0].value);
    setText('');
  };

  return (
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0 hover:bg-green-800"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
