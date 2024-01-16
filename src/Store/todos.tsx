import { ReactNode, createContext, useContext, useState } from "react";
export type TodosProviderPorps = {
  children: ReactNode;
};
export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type TodosContext = {
  todos: Todo[];
  handleAddTodo: (task: string) => void;
  toggletaskCompleted:(id:string)=>void
  handleTaskDelete:(id:string)=>void
};
export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children }: TodosProviderPorps) => {
  const [todos, setTodo] = useState<Todo[]>(()=>{
    try {
        const newTodos= localStorage.getItem('todos') || "[]"
        return JSON.parse(newTodos) as Todo[]
    } catch (error) {
        return[]
    }
  });

  const handleAddTodo = (task: string) => {
    setTodo((prev) => {
      const newTodo: Todo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      localStorage.setItem('todos',JSON.stringify(newTodo))
      return newTodo;
    });
  };

  const toggletaskCompleted=(id:string)=>{
    setTodo((prev)=>{
        const newTodos= prev.map((todo)=>{
            if(todo.id===id){
                return{...todo, completed:!todo.completed}
            }
            return todo
        })
        localStorage.setItem('todos',JSON.stringify(newTodos))
        return newTodos
    })
  }

  const handleTaskDelete=(id:string)=>{
    setTodo((prev)=>{
        const newTodos=prev.filter((items)=> items.id !== id);
        localStorage.setItem('todos',JSON.stringify(newTodos))
        return newTodos
    })
  }

  return (
    <todosContext.Provider value={{ todos, handleAddTodo,toggletaskCompleted,handleTaskDelete }}>
      {children}
    </todosContext.Provider>
  );
};

export const useTodos = () => {
  const todosConsumer = useContext(todosContext);
  if (!todosConsumer) {
    throw new Error("outsie of provider");
  }
  return todosConsumer;
};
