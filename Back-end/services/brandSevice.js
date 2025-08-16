import Brand from "../models/Brand.js";

const brandService = {
  search(data) {
    return Brand.find({ brand: data});
  },
};

export default brandService;
