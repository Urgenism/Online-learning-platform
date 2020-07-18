import * as Yup from "yup";

export const initialFormData = {
  courseName: "",
  programName: "",
  semester: "",
  startDate: "",
};

export const validationSchmea = Yup.object().shape({
  courseName: Yup.string().required("Course name is required!"),
  programName: Yup.string().required("Program name is required!"),
  semester: Yup.string().required("Semester is required!"),
  startDate: Yup.string().required("Start Date is required!"),
});
