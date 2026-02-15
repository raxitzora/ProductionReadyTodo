"use client"

import { useEffect, useState } from "react"
import { useTodoStore } from "@/store/todoStore"

export default function Dashboard() {
const { todos, fetchTodos, addTodo, toggleTodo, deleteTodo } = useTodoStore()
  const [title, setTitle] = useState("")

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    await addTodo(title)
    setTitle("")
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="border p-2 flex-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-black text-white px-4">Add</button>
      </form>

   <ul className="mt-6 space-y-2">
  {todos.map((todo) => (
    <li key={todo._id} className="border p-2 flex justify-between items-center">
      <span
        className={todo.completed ? "line-through" : ""}
      >
        {todo.title}
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => toggleTodo(todo._id)}
          className="text-sm bg-gray-200 px-2"
        >
          Toggle
        </button>

        <button
          onClick={() => deleteTodo(todo._id)}
          className="text-sm bg-red-400 text-white px-2"
        >
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>

    </div>
  )
}
