import Comment from "../models/Comment.js";
import Sneakers from "../models/Sneaker.js";

const commentService = {
  async createComment(text, ownername, sneakersID) {
    const comment = await Comment.create({ 
      text, 
      owner: ownername, 
      sneakersId: sneakersID
    });
    await Sneakers.findByIdAndUpdate(
      sneakersID, 
      { $push: { comments: comment._id } }
    );
    return comment;
  },
  

};
export default commentService;
