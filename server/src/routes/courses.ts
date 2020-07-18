import { Router, Request, Response } from "express";
import Course from "../models/Course";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const course = new Course(req.body);
  try {
    const savedCourse = await course.save();
    res.json(savedCourse);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.put("/", async (req: Request, res: Response) => {
  try {
    const { _id, ...postData } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(_id, postData, {
      new: true,
    });
    res.json(updatedCourse);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  console.log(req.params);
  try {
    const deleteCourse = await Course.remove({ _id: req.params.id });
    res.send(deleteCourse);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const courses = await Course.findById(req.params.id);
    res.json(courses);
  } catch (err) {
    console.log(err);
  }
});

export default router;
