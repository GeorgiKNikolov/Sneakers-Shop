
import Sneakers from "../models/Sneaker.js";

const sneakersService = {
  getAll() {
    return Sneakers.find();
  },

  search(brand, activity) {
    const query = {};

    if (brand) {
      query.brand = { $regex: brand, $options: "i" };
    }
    if (activity) {
      query.activity = { $regex: activity, $options: "i" };
    }
    return Sneakers.find(query);
  },

  getOne(sneakersId) {
    return Sneakers.findById(sneakersId);
  },

  upload(sneakersData, Id) {
    return Sneakers.create({ ...sneakersData, owner: Id });
  },

  remove(sneakersId) {
    return Sneakers.findByIdAndDelete(sneakersId);
  },

  edit(sneakersId, sneakersData) {
    return Sneakers.findByIdAndUpdate(sneakersId, sneakersData, {
      runValidators: true,
    });
  },
  like(sneakersId, userId) {
    return Sneakers.findByIdAndUpdate(
      sneakersId,
      { $addToSet: { likes: userId } },
      { new: true }
    );
  },

  ordered(snekers) {
    return Sneakers.deleteMany({ _id: { $in: snekers } });
  },

  getComment(sneakersId) {
    return Sneakers.findById(sneakersId).select("comments").populate("comments")
  },

};

export default sneakersService;
