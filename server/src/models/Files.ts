import mongoose from "mongoose";

const FilesSchema = new mongoose.Schema(
  {
    filePaths: {
      type: Array,
      required: true,
    },
    courseId: {
      type: String,
      ref: "course",
    },
  },
  { timestamps: true }
);

export default mongoose.model("files", FilesSchema);
