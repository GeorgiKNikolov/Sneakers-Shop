import { Router } from "express";
import sneakersService from "../services/sneakersService.js";

// add authentication for UPLOAD, DELETE AND EDIT !!!

const sneakersController = Router();

sneakersController.get("/search", async (req, res) => {
  const { brand, activity } = req.query;

  const sneakers = await sneakersService.search(brand, activity);
  res.status(200).json(sneakers);
});

sneakersController.get("/sneakers", async (req, res) => {
  const sneaker = await sneakersService.getAll();
  res.status(200).json(sneaker);
});

sneakersController.get("/sneakers/:sneakersId", async (req, res) => {
  const sneaker = await sneakersService.getOne(req.params.sneakersId);
  res.status(200).json(sneaker);
});

sneakersController.post("/upload", async (req, res) => {
  const sneakersData = req.body;
  const id = req.body.userId;

  try {
    const sneaker = await sneakersService.upload(sneakersData, id);
    res.status(200).json(sneaker);
  } catch (error) {
    console.log(error);
  }
});

sneakersController.put("/likes/:sneakersId", async (req, res) => {
  const id = req.user._id;
  const sneakerId = req.params.sneakersId;

  try {
    const user = await sneakersService.like(sneakerId, id);
    console.log(user);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

sneakersController.delete("/delete/:sneakersId", async (req, res) => {
  const id = req.params.sneakersId;

  try {
    const data = await sneakersService.remove(id);

    res.status(200).json(data).end();
  } catch (error) {
    console.log(error);
  }
});

sneakersController.put("/edit/:sneakersId", async (req, res) => {
  const sneakersData = req.body;
  const sneakersId = req.params.sneakersId;

  try {
    await sneakersService.edit(sneakersId, sneakersData);
    res.end();
  } catch (error) {
    console.log(error);
  }
});
sneakersController.post("/ordered", async (req, res) => {
  const ids = req.body;
  try {
    const data = await sneakersService.ordered(ids);
    res.status(200).json(data).end();
  } catch (error) {
    console.log(error);
  }
});

export default sneakersController;
