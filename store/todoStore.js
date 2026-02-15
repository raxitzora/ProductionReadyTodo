import { create } from "zustand"

export const useTodoStore = create((set) => ({
  todos: [],
  loading: false,

  fetchTodos: async () => {
    set({ loading: true })
    const res = await fetch("/api/todos")
    const data = await res.json()
    set({ todos: data, loading: false })
  },

  addTodo: async (title) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })

    const newTodo = await res.json()

    set((state) => ({
      todos: [newTodo, ...state.todos],
    }))
  }, 
  toggleTodo: async (id) => {
  const res = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
  })

  if (!res.ok) return

  const updated = await res.json()

  set((state) => ({
    todos: state.todos.map((todo) =>
      todo._id === id ? updated : todo
    ),
  }))
},

deleteTodo: async (id) => {
  const res = await fetch(`/api/todos/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) return

  set((state) => ({
    todos: state.todos.filter((todo) => todo._id !== id),
  }))
},

}



))
