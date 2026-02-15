import { connectDB } from "@/lib/db"
import Todo from "@/models/Todo"
import { revalidatePath } from "next/cache";

export async function getTodosByUser(userId) {
  await connectDB()
  return await Todo.find({ clerkId: userId }).sort({ createdAt: -1 })
}

export async function createTodo(userId, title) {
  await connectDB()

  if (!title || title.length > 200) {
    throw new Error("Invalid title")
  }

  return await Todo.create({
    clerkId: userId,
    title,
  })
}

export async function toggleTodo(userId, todoId) {
  await connectDB()

  const todo = await Todo.findOne({
    _id: todoId,
    clerkId: userId,
  })

  if (!todo) {
    throw new Error("Todo not found")
  }

  todo.completed = !todo.completed
  await todo.save

  return todo
}

export async function deleteTodo(userId, todoId) {
  try {
    await connectDB();

    // Use findOneAndDelete to ensure ownership
    const result = await Todo.findOneAndDelete({
      _id: todoId,
      clerkId: userId, // Assuming clerkId is the field name in your schema
    });

    if (!result) {
      // Could be the ID is wrong OR the user doesn't own it
      return { error: "Todo not found or unauthorized" };
    }

    // Refresh the UI if using Next.js App Router
    revalidatePath("/todos"); 
    
    return { success: true, data: result };
  } catch (error) {
    console.error("Delete Error:", error);
    return { error: "Internal Server Error" };
  }
}