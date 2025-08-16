import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";
const SALT_ROUNDS = 11;

const userSchema = new Schema({
  image: {
    type: String,
  },
  tel: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Username should be at least 5 characters"],
    validate: {
      validator: function (v) {
        return /[a-zA-Z0-9]+/g.test(v);
      },
      message: (props) =>
        `${props.value} must contains only latin letters and digits!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [5, "Password should be at least 5 characters"],
    validate: {
      validator: function (v) {
        return /[a-zA-Z0-9]+/g.test(v);
      },
      message: (props) =>
        `${props.value} must contains only latin letters and digits!`,
    },
  },
  sneakers: [
    {
      type: Types.ObjectId,
      ref: "Sneaker",
    },
  ],
  basket: [
    {
      type: Types.ObjectId,
      ref: "Sneaker",
    },
  ],
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, SALT_ROUNDS);

  this.password = hash;
});

const User = model("User", userSchema);

export default User;
