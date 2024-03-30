import express from "express";
import Photo from "../models/Photo";
import mongoose, { Types } from "mongoose";
import auth, { RequestWithUser } from "../middleware/auth";
import { imageUpload } from "../multer";
import permit from "../middleware/permit";

const photosRouter = express.Router();

photosRouter.get("/", async (req, res, next) => {
  try {
    let photos;

    if (req.query.user) {
      photos = await Photo.find({ user: req.query.user }).populate(
        "user",
        "displayName"
      );
    } else {
      photos = await Photo.find().populate("user", "displayName");
    }
    return res.send(photos);
  } catch (e) {
    next(e);
  }
});

photosRouter.get("/:id", async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: "Wrong ObjectId!" });
    }

    const photo = await Photo.findById(_id);

    if (!photo) {
      return res.status(404).send({ error: "Not found!" });
    }

    res.send(photo);
  } catch (e) {
    next(e);
  }
});

photosRouter.post(
  "/",
  auth,
  imageUpload.single("image"),
  async (req: RequestWithUser, res, next) => {
    try {
      const photoData = {
        user: req.user?._id,
        title: req.body.title,
        image: req.file ? req.file.filename : null,
      };

      const photo = new Photo(photoData);
      await photo.save();

      return res.send(photo);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }
      next(e);
    }
  }
);

photosRouter.delete(
  "/:id",
  auth,
  permit("admin", "user"),
  async (req: RequestWithUser, res, next) => {
    try {
      const photoId = req.params.id;

      const photo = await Photo.findById(photoId);
      if (!photo) {
        return res.status(404).send({ error: "Photo not found!" });
      }

      await Photo.findByIdAndDelete(photoId);

      return res.send({ message: "Photo has been deleted." });
    } catch (e) {
      next(e);
    }
  }
);

export default photosRouter;
