import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
    {
        clerkId:{
            type:String,
            required:true,
            index:true
        },
        title:{
            type:String,
            required:true,
            trim:true,
            maxlength:200
        },
        completed:{
            type:Boolean,
            default:false,
        },
    },
    {timestamps:true}
)
export default mongoose.models.Todo || mongoose.model("Todo",TodoSchema);