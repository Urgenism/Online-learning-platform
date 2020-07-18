import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { initialFormData } from "./courseFormSchema";
import * as schema from "./courseFormSchema";
import "./CourseForm.css";

type TProps = {
  formData: typeof initialFormData;
  closeModal: () => void;
  handleFormSubmit: (data: typeof initialFormData) => void;
};

const CourseForm: React.FC<TProps> = ({
  formData,
  closeModal,
  handleFormSubmit,
}) => {
  return (
    <Formik
      initialValues={formData}
      validationSchema={schema.validationSchmea}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          handleFormSubmit(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {() => (
        <Form className='form'>
          <div className='form-item'>
            <label htmlFor='courseName' className='form-item__label'>
              Course Name
              <small> *</small>
            </label>
            <Field
              type='text'
              name='courseName'
              id='courseName'
              className='form-item__input'
            />
            <ErrorMessage
              name='courseName'
              render={(msg) => <div className='form-item__error'>{msg}</div>}
            />
          </div>
          <div className='form-item'>
            <label htmlFor='programName' className='form-item__label'>
              Program Name
              <small> *</small>
            </label>
            <Field
              type='text'
              name='programName'
              id='programName'
              className='form-item__input'
            />
            <ErrorMessage
              name='programName'
              render={(msg) => <div className='form-item__error'>{msg}</div>}
            />
          </div>
          <div className='form-item'>
            <label htmlFor='semester' className='form-item__label'>
              Semester
              <small> *</small>
            </label>
            <Field
              type='text'
              name='semester'
              id='semester'
              className='form-item__input'
            />
            <ErrorMessage
              name='semester'
              render={(msg) => <div className='form-item__error'>{msg}</div>}
            />
          </div>
          <div className='form-item'>
            <label htmlFor='startDate' className='form-item__label'>
              Start Date
              <small> *</small>
            </label>
            <Field
              type='date'
              name='startDate'
              id='semester'
              className='form-item__input'
            />

            <ErrorMessage
              name='startDate'
              render={(msg) => <div className='form-item__error'>{msg}</div>}
            />
          </div>
          <div className='form__button'>
            <button type='button' className='btn gray' onClick={closeModal}>
              Cancel
            </button>
            <button type='submit' className='btn primary'>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CourseForm;
