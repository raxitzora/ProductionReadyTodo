import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Todo from "@/models/Todo";
import { NextResponse } from "next/server";

export async function GET(){
    const {userId} = auth()

    if(!userId){
        return new NextResponse("Unauthorised",{status:401})
    }

    await connectDB()

    const todos = await Todo.find({clerkId:userId}).sort({createdAt:-1})
    return NextResponse.json(todos)
}


export async function POST(req){
    const {userId} = auth()

  
  if (!userId) {
    return new Response("Unauthorized", { status: 401 })
  }

    const body = await req.json()

      if (!body.title || body.title.length > 200) {
    return new Response("Invalid title", { status: 400 })
  }

    await connectDB()


    const todo = await Todo.create({
    clerkId: userId,
    title: body.title,
  })

    return Response.json(todo)

}