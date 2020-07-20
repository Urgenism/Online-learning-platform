import mongoose from "mongoose";

const FilesSchema = new mongoose.Schema(
  {
    files: {
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
