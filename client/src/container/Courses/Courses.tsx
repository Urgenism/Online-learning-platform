import React, { useReducer, useEffect } from "react";
import Course from "components/Course/Course";
import { toast } from "react-toastify";
import "./Courses.css";
import Button from "components/Button/Button";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import Modal from "components/Modal/Modal";
import ApiService from "services/Apis";
import { AxiosResponse, AxiosError } from "axios";
import CourseForm from "components/Course/CourseForm/CourseForm";
import { initialFormData } from "components/Course/CourseForm/courseFormSchema";

const client = new ApiService({});

const initialState = {
  formData: initialFormData,
  courses: { loading: false, error: "", data: [] },
  showModal: false,
};

function reducer(state: typeof initialState, action: any) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, showModal: true, formData: initialFormData };
    case "CLOSE_MODAL":
      return { ...state, showModal: false };
    case "FETCH_COURSES_START":
      return { ...state, courses: { ...state.courses, loading: true } };
    case "FETCH_COURSES_SUCCESS":
      return {
        ...state,
        courses: { ...state.courses, data: action.payload, loading: false },
      };
    case "FETCH_COURSES_FAILED":
      return {
        ...state,
        courses: { ...state.courses, error: action.payload, loading: false },
      };
    case "ADD_COURSE":
      return {
        ...state,
        courses: { ...state.courses, data: action.payload },
      };
    case "EDIT_COURSE":
      return {
        ...state,
        showModal: true,
        formData: action.payload,
      };
    case "DELETE_COURSE":
      return {
        ...state,
        courses: { ...state.courses, data: action.payload },
      };

    default:
      return state;
  }
}

const Courses = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH_COURSES_START" });
    client
      .get("/courses")
      .then((response: AxiosResponse) => {
        dispatch({ type: "FETCH_COURSES_SUCCESS", payload: response });
      })
      .catch((err: AxiosError) => {
        dispatch({ type: "FETCH_COURSES_FAILED", error: err });
      });
  }, []);

  const handleFormSubmit = async (data: any) => {
    let savedData: any;
    try {
      if (data._id) {
        // UPDATING DATA
        savedData = await client.put("/courses", data);
        const updatedCourses = state.courses.data.map((item: any) => {
          if (item._id === savedData._id) {
            return savedData;
          }
          return item;
        });

        dispatch({
          type: "ADD_COURSE",
          payload: updatedCourses,
        });
      } else {
        // POSTING NEW DATA
        savedData = await client.post("/courses", data);

        dispatch({
          type: "ADD_COURSE",
          payload: [...state.courses.data, savedData],
        });
      }
      toast.success("data succesfully saved");
      dispatch({ type: "CLOSE_MODAL" });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      const response = await client.delete(`/courses/${id}`);
      if (response) {
        const updatedCourses = state.courses.data.filter(
          (item: any) => item._id !== id
        );
        dispatch({ type: "DELETE_COURSE", payload: updatedCourses });
        toast.success("data successfully deleted");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        modalTitle='Add Courses'
        showModal={state.showModal}
        closeModal={() => dispatch({ type: "CLOSE_MODAL" })}
      >
        <CourseForm
          formData={state.formData}
          closeModal={() => dispatch({ type: "CLOSE_MODAL" })}
          handleFormSubmit={handleFormSubmit}
        />
      </Modal>
      <Breadcrumb breadcrumbLinks={[{ path: "/", title: "Courses" }]} />
      <main className='courses'>
        <div className='courses__title-wrap'>
          <h2 className='courses__title'>Current Semester Courses</h2>
          <Button
            buttonText='Add Courses'
            buttonBg='primary'
            clickHandler={() => dispatch({ type: "OPEN_MODAL" })}
          />
        </div>
        <div className='courses__list'>
          {state.courses.data.length > 0
            ? state.courses.data.map((course: any) => {
                return (
                  <Course
                    key={course._id}
                    editCourseHandler={() =>
                      dispatch({
                        type: "EDIT_COURSE",
                        payload: {
                          ...course,
                          startDate: course.startDate.split("T")[0],
                        },
                      })
                    }
                    deleteCourseHandler={() => deleteCourse(course._id)}
                    {...course}
                  />
                );
              })
            : "There is no any course"}
        </div>
      </main>
    </>
  );
};

export default Courses;
