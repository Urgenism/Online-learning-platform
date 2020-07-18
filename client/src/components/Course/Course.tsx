import React from "react";
import "./Course.css";
import { Link } from "react-router-dom";

const Course = () => {
  return (
    <div className='course'>
      <h3 className='course__faculty'>Bioengineering</h3>
      <div className='course__body'>
        <h4 className='course__title'>Course Name</h4>
        <p className='course__program-name'>Program Name</p>
        <p className='course__semester'>Semester: Quarter 1st</p>
        <p className='course__start-date'>Start Date: Jun 1, 2020</p>
        <div className='course__btns'>
          <Link to='/files' className='btn primary'>
            Add Files
          </Link>
          <button className='btn blue'>Edit</button>
          <button className='btn danger'>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Course;
