import { Router } from "express";
import commentService from "../services/commentService.js";
import sneakersService from "../services/sneakersService.js";

const commentController = Router();

commentController.post("/comment", async (req, res) => {
  const { data, owner, sneakersId } = req.body;

  try {
    const comment = await commentService.createComment(
      data,
      owner,
      sneakersId
    );

    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
  }
});

commentController.get("/comment/:sneakersId", async (req, res) => {
  const id = req.params.sneakersId;
  console.log(id);

  try {
    const comments = await sneakersService.getComment(id);
   
    console.log( comments.comments);
    
    res.status(200).json(comments.comments);
  } catch (err) {
    console.log(err);
  }
});

export default commentController;
