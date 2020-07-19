import express, { Request, Response } from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import coursesRoute from "./routes/courses";
import filesRoute from "./routes/files";
const app = express();

const dbURI =
  "mongodb+srv://test:test1234@learningplatform.mf8bv.mongodb.net/online-learning-platform?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World! fuck");
});

app.use("/courses", coursesRoute);
app.use("/files", filesRoute);

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result: any) => console.log("database connected"))
  .catch((err: any) => console.log(err));

app.listen(8000, () => {
  console.log("Server Started at Port, 8000");
});
