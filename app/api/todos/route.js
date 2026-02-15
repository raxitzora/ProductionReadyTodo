import { auth } from "@clerk/nextjs/server"
import { getTodosByUser, createTodo } from "@/services/todo.service"

export async function GET() {
  const { userId } = await auth()
  if (!userId) return new Response("Unauthorized", { status: 401 })
console.log("clerk",userId);

  try {
    const todos = await getTodosByUser(userId)
    return Response.json(todos)
  } catch (err) {
    return new Response("Server error", { status: 500 })
  }
}

export async function POST(req) {
  const { userId } = await auth()
  if (!userId) return new Response("Unauthorized", { status: 401 })

  try {
    const { title } = await req.json()
    const todo = await createTodo(userId, title)
    return Response.json(todo)
  } catch (err) {
    return new Response(err.message, { status: 400 })
  }
}
