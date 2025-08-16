import { Schema, model, Types } from "mongoose";

const commentShema = new Schema(
  {
    text: {
      type: String,
    },
    owner: {
       type: String,
    },
    sneakersId: {
      type: Types.ObjectId,
      ref: "Sneaker",
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Comment = model("Comment", commentShema);
export default Comment;
