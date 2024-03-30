import express from "express";
import User from "../models/User";
import mongoose, { Types } from "mongoose";
import config from "../config";
import { OAuth2Client } from "google-auth-library";

const userRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

userRouter.get("/:id", async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: "Wrong ObjectId!" });
    }

    const user = await User.findById(_id).select("displayName _id");

    if (!user) {
      return res.status(404).send({ error: "Not found!" });
    }

    res.send(user);
  } catch (e) {
    next(e);
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
    });
    user.generateToken();
    await user.save();
    return res.send({ message: "ok!", user: user });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

userRouter.post("/sessions", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(422).send({ error: "Email or password is wrong!!" });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: "Email or password is wrong!!" });
    }
    user.generateToken();
    await user.save();

    return res.send({ message: "Email and password are correct!", user });
  } catch (e) {
    next(e);
  }
});

userRouter.delete("/sessions", async (req, res, next) => {
  try {
    const headerValue = req.get("Authorization");
    const successMessage = { message: "Success!" };

    if (!headerValue) {
      return res.send({ ...successMessage, stage: "No header" });
    }

    const [_bearer, token] = headerValue.split(" ");

    if (!token) {
      return res.send({ ...successMessage, stage: "No token" });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send({ ...successMessage, stage: "No user" });
    }

    user.generateToken();
    await user.save();

    return res.send({ ...successMessage, stage: "Success" });
  } catch (e) {
    return next(e);
  }
});

userRouter.post("/google", async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send("Google login error");
    }

    const email = payload["email"];
    const id = payload["sub"];
    const displayName = payload["name"];

    if (!email) {
      return res.status(400).send({ error: "Email is not present!" });
    }

    let user = await User.findOne({ googleID: id });

    if (!user) {
      user = new User({
        email,
        password: crypto.randomUUID(),
        googleID: id,
        displayName,
      });
    }

    user.generateToken();

    await user.save();

    return res.send({
      message: "Login with google successful!",
      user,
    });
  } catch (e) {
    return next(e);
  }
});

export default userRouter;
