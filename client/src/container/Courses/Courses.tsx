import React, { useReducer } from "react";
import Course from "components/Course/Course";
import "./Courses.css";
import Button from "components/Button/Button";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import Modal from "components/Modal/Modal";

const initialState = { showModal: false };

function reducer(state: typeof initialState, action: any) {
  switch (action.type) {
    case "openModal":
      return { showModal: true };
    case "closeModal":
      return { showModal: false };
    default:
      return state;
  }
}

const Courses = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Modal
        modalTitle='Add Courses'
        showModal={state.showModal}
        closeModal={() => dispatch({ type: "closeModal" })}
      >
        <form>forms</form>
      </Modal>
      <Breadcrumb breadcrumbLinks={[{ path: "/", title: "Courses" }]} />
      <main className='courses'>
        <div className='courses__title-wrap'>
          <h2 className='courses__title'>Current Semester Courses</h2>
          <Button
            buttonText='Add Courses'
            buttonBg='primary'
            clickHandler={() => dispatch({ type: "openModal" })}
          />
        </div>
        <div className='courses__list'>
          <Course />
          <Course />
          <Course />
          <Course />
        </div>
      </main>
    </>
  );
};

export default Courses;
