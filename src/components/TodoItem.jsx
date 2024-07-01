import React, { useRef, useState } from 'react'
import {useTodo} from '../contexts/TodoContext.js'

//a todo object will be sent as a prop
function TodoItem({ todo }) {
    const {updateTodo, deleteTodo, toggleCompleted} = useTodo();

    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.title);


    console.log('rendering todoItem for ', todo);
    

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            {/* todo complete or not checkbox */}
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={() => {
                    toggleCompleted(todo.id);
                }}
                disabled={isTodoEditable}
            />

            {/* The input box where todo is Shown */}
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black border-2 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)} //so that when we are editing, typed text is rendered
                readOnly={!isTodoEditable}
            />

            {/* Edit (or Save) Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return; //do nothing if todo is completed

                    //if isTodoEditable -> true, then it's save button, so call update Todo 
                    if (isTodoEditable) {
                        
                        setIsTodoEditable((prev) => !prev)
                        updateTodo(todo.id, todoMsg); 
                    } 
                    
                    else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;



