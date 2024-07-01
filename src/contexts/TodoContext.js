import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos : [{
        id : 1,
        title : "Sample Todo",
        completed : false,
    }],

    //todo is a string, which will be used as the title
    addTodo : (todo) => {},
    updateTodo : (id, todo) => {},
    deleteTodo : (id) => {},
    toggleCompleted : (id) => {}
});

export const useTodo = () => {
    return useContext(TodoContext);
}

