import { Schema, model } from "mongoose";

const brandSchema = new Schema({
  brand:{
    type:String,
  },
  logo: {
    type: String,
  },
});
const Brand = model("Brand", brandSchema);
export default Brand;
