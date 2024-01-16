import React from 'react'
import { useTodos } from '../Store/todos'
import { useSearchParams } from 'react-router-dom'

const Todos = () => {
    const{todos,toggletaskCompleted,handleTaskDelete}= useTodos()

    const [searchParams]=useSearchParams()
    const todosData=searchParams.get('todos')

    let filterData=todos

    if(todosData === 'active'){
        filterData=filterData.filter((items)=>!items.completed)
    }
    if(todosData === 'completed'){
        filterData=filterData.filter((items)=>items.completed)
    }


  return (
    <ul className='main-task'>
        {
            filterData.map((item)=>{
                return <li key={item.id}>
                    <input type='checkbox' id={`todo- ${item.id}`}
                        checked={item.completed}
                        onChange={()=>toggletaskCompleted(item.id)}
                    />{
                        item.completed ?(

                            <label htmlFor={`todo- ${item.id}`}><s>{item.task}</s></label>
                        ):(
                            <label htmlFor={`todo- ${item.id}`}>{item.task}</label>
                        )
                    }
                    {
                        item.completed && (
                            <button type='button' onClick={()=>handleTaskDelete(item.id)}>Delete</button>
                        )
                    }
                </li>
            })
        }
    </ul>
  )
}

export default Todos