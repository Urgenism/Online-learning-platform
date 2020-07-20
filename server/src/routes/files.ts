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
        reqFiles.push({
          filePath: url + "/" + filesArray[i].filename,
          fileName: filesArray[i].filename,
          fileSize: filesArray[i].size,
        });
      }

      let postFiles: any;
      const postData = {
        courseId: req.body.courseId,
        files: reqFiles,
      };

      // console.log(postData);

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
        postFiles = new Files(postData);
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
  try {
    const courses = await Files.findOne({ courseId: req.params.id });
    res.json(courses);
  } catch (err) {
    console.log(err);
  }
});

export default router;
