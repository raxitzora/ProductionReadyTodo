import { auth } from "@clerk/nextjs/server"
import { toggleTodo, deleteTodo } from "@/services/todo.service"

export async function PATCH(req, { params }) {
  const { userId } = await auth()
  if (!userId) {
    return new Response("Unauthorized", { status: 401 })
  }

  try {
    const updatedTodo = await toggleTodo(userId, params.id)
    return Response.json(updatedTodo)
  } catch (err) {
    return new Response(err.message, { status: 400 })
  }
}


export async function DELETE(req, { params }) {
  const { userId } = await auth()
  if (!userId) {
    return new Response("Unauthorized", { status: 401 })
  }

  try {
    await deleteTodo(userId, params.id)
    return new Response("Deleted", { status: 200 })
  } catch (err) {
    return new Response(err.message, { status: 400 })
  }
}
