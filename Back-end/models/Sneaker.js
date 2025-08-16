import { Schema, model, Types } from "mongoose";

const sneakersSchema = new Schema({
  photo: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  prise: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Sneakers = model("Sneaker", sneakersSchema);

export default Sneakers;
