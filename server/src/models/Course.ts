import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  programName: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("courses", CourseSchema);
