import { Router, Request, Response } from "express";
import path from "path";
import Files from "../models/Files";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/"));
  },
  filename: (req, file, cb) => {
    // cb(null, Date.now() + "-" + file.originalname);
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
  // fileFilter: (req, file, cb) => {
  //   console.log("upload");
  //   if (
  //     file.mimetype == "image/png" ||
  //     file.mimetype == "image/jpg" ||
  //     file.mimetype == "image/jpeg"
  //   ) {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //     return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  //   }
  // },
});

router.post(
  "/upload",
  upload.array("files"),
  async (req: Request, res, next) => {
    try {
      let reqFiles = [];
      const url = req.protocol + "://" + req.get("host");
      const filesArray: Record<string, any> = req.files;
      for (var i = 0; i < filesArray.length; i++) {
        reqFiles.push(url + "/" + filesArray[i].filename);
      }

      let postFiles: any;
      const postData = {
        courseId: req.body.courseId,
        filePaths: reqFiles,
      };

      let oldData = await Files.find({
        courseId: req.body.courseId,
      });
      if (oldData.length > 0) {
        postFiles = await Files.findOneAndUpdate(
          {
            courseId: req.body.courseId,
          },
          postData,
          {
            new: true,
          }
        );
      } else {
        postFiles = new Files({
          courseId: req.body.courseId,
          filePaths: reqFiles,
        });
      }

      let savedFiles = await postFiles.save();
      res.status(201).json({ message: "Done upload!", data: savedFiles });
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  }
);

router.get("/courseId/:id", async (req: Request, res: Response) => {
  console.log(req.params.id);
  try {
    const courses = await Files.find({ courseId: req.params.id });
    res.json(courses);
  } catch (err) {
    console.log(err);
  }
});

export default router;
