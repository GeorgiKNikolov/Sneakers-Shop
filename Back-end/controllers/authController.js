import { Router } from "express";
import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../constants.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";

const authController = Router();

authController.post("/register", isGuest, async (req, res) => {
  const { username, email, password, rePassword, tel, image } = req.body;

  try {
    const { token, user } = await authService.register(
      username,
      email,
      password,
      rePassword,
      tel,
      image
    );

    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

authController.post("/login", isGuest, async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await authService.login(email, password);

    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

authController.get("/profile", isAuth, async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await authService.getProfile(_id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

authController.post("/logout", isAuth, async (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
 
});

authController.post("/basket/:ownerId", isAuth, async (req, res) => {
  const userId = req.params.ownerId;
  const sneakersId = req.body.sneakersid;
  try {
    const user = await authService.addToBasket(userId, sneakersId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

authController.get("/basket/:ownerId", isAuth, async (req, res) => {
  const userId = req.params.ownerId;
  try {
    const user = await authService.getBasket(userId);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

authController.put("/basket/:ownerId", isAuth, async (req, res) => {
  const userId = req.params.ownerId;
  const sneakersId = req.body.sneakersId;
  try {
    const user = await authService.delBasketItem(userId, sneakersId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

authController.put("/complete-order", isAuth, async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await authService.completeOrder(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

authController.put("/edit-user-info/:userId", isAuth, async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const user = await authService.editProfileInfo(userId, data);
    console.log(user);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

export default authController;
