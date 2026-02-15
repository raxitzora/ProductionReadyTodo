import { create } from "zustand";


export const useTodoStore = create((set)=>({
    todos:[],
    loading:false,

    fetchTodos:async ()=>{
        set({loading:true})
        const res = await fetch("/api/todos")
        const data = await res.json(res)
        set({todos:data,loading:false})
    },

    addTodo:async(title)=>{
        const res = await fetch("/api/todos",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({ title }),
        })

        const newTodo = await res.json()

        set((state)=>({
            todos:[newTodo,...state.todos],
        }))
    },
}))