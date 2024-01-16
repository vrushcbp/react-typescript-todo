import  React ,{ FormEvent, useState } from 'react'
import { useTodos } from '../Store/todos'

const addTodo = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [todo, setTodo] = useState('')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const{handleAddTodo}=useTodos()
    const handleSubmit=(e:FormEvent<HTMLElement>)=>{
        e.preventDefault()
        if(todo===''){
            return
        }
        handleAddTodo(todo)
        setTodo('')
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type='text' value={todo}  onChange={(e)=>setTodo(e.target.value)}/>
        <button type='submit' disabled={todo===''? true: false} className={todo===''?'disabledBtn':''}>Add</button>
    </form>
  )
}

export default addTodo