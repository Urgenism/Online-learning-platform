import React from "react";
import "./Course.css";
import { Link } from "react-router-dom";

type TProps = {
  courseName: String;
  programName: String;
  semester: String;
  startDate: String;
  editCourseHandler: () => void;
  deleteCourseHandler: () => void;
};

const Course: React.FC<TProps> = ({
  courseName,
  programName,
  semester,
  startDate,
  editCourseHandler,
  deleteCourseHandler,
}) => {
  return (
    <div className='course'>
      <h3 className='course__faculty'>Bioengineering</h3>
      <div className='course__body'>
        <h4 className='course__title'>{courseName}</h4>
        <p className='course__program-name'>{programName}</p>
        <p className='course__semester'>Semester: {semester}</p>
        <p className='course__start-date'>
          Start Date: {startDate.split("T")[0]}
        </p>
        <div className='course__btns'>
          <Link to='/files' className='btn primary'>
            Add Files
          </Link>
          <button className='btn blue' onClick={editCourseHandler}>
            Edit
          </button>
          <button className='btn danger' onClick={deleteCourseHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;
