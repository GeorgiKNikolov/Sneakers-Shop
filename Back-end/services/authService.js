import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "../lib/jwt.js";

const JWT_SECRET = "622das55asd2185gfg1dhf54gfh5";

const authService = {
  async register(username, email, password, rePassword, tel, image) {
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (password !== rePassword) {
      throw new Error("Password missmatch");
    }

    if (user) {
      throw new Error("User already exists");
    }

    const newUser = await User.create({
      username,
      email,
      password,
      image,
      tel,
    });

    return this.generateToken(newUser);
  },

  async login(email, password) {
    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      throw new Error("Invalid user or password");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Invalid user or password");
    }

    return this.generateToken(user);
  },

  async generateToken(user) {
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.username,
    };
    const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });

    return { token, user };
  },
  async getProfile(Id) {
    const user = await User.findById(Id, { password: 0, __v: 0 });

    return user;
  },

  async addToBasket(userId, sneakersId) {
    return User.findByIdAndUpdate(
      userId,
      { $addToSet: { basket: sneakersId } },
      { new: true }
    );
  },

  async getBasket(userId) {
    return User.findById(userId).populate("basket").exec();
  },

  async delBasketItem(userId, sneakerId) {
    return User.findByIdAndUpdate(
      userId,
      {
        $pull: { basket: sneakerId },
      },
      { new: true }
    )
      .populate("basket")
      .exec();
  },

  async completeOrder(userId) {
    return User.findByIdAndUpdate(
      userId,
      { $set: { basket: [] } },
      { new: true }
    );
  },

  async editProfileInfo(userId, data) {
    return User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
  },
};

export default authService;
