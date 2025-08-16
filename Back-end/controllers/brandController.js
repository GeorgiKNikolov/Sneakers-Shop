import { Router } from "express";
import brandService from "../services/brandSevice.js";

const brandControler = Router();

brandControler.get("/brand-adidas", async (req, res) => {
  const query = req.path;
  
  const brandLogo = await brandService.search(query.slice(7));
  
  res.status(200).json(brandLogo);
});

brandControler.get("/brand-nike", async (req, res) => {
  const query = req.path;

  const brandLogo = await brandService.search(query.slice(7));
  res.status(200).json(brandLogo);
});
brandControler.get("/brand-puma", async (req, res) => {
  const query = req.path;

  const brandLogo = await brandService.search(query.slice(7));
  res.status(200).json(brandLogo);
});
brandControler.get("/brand-asics", async (req, res) => {
 const query = req.path;

  const brandLogo = await brandService.search(query.slice(7));
  res.status(200).json(brandLogo);
});
brandControler.get("/brand-reebok", async (req, res) => {
  const query = req.path;

  const brandLogo = await brandService.search(query.slice(7));
  res.status(200).json(brandLogo);
});

export default brandControler;
