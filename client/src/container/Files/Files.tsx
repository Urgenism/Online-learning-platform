import React, { useReducer } from "react";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import "./Files.css";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import Table from "components/Table/Table";

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

const Files = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const data = React.useMemo(
    () => [
      {
        name: "File example.xlsx",
        dateAdded: "jun 10, 2020",
        lastModified: "jun 10, 2020",
        size: "41.67kb",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Date Added",
        accessor: "dateAdded",
      },
      {
        Header: "Last Modified",
        accessor: "lastModified",
      },
      {
        Header: "Size",
        accessor: "size",
      },
    ],
    []
  );

  return (
    <div>
      <Modal
        modalTitle='Upload Files'
        showModal={state.showModal}
        closeModal={() => dispatch({ type: "closeModal" })}
      >
        <form>Upload Files</form>
      </Modal>
      <Breadcrumb
        breadcrumbLinks={[
          { path: "/", title: "Courses" },
          { path: "/files", title: "course name" },
        ]}
      />
      <main className='files'>
        <aside className='files__sidebar'>
          <ul className='files__sidebar-list'>
            <li className='files__sidebar-item active'>Files</li>
          </ul>
        </aside>
        <div className='files__content'>
          <div className='files__title-wrap'>
            <h2 className='files__title'>Files and Folders</h2>
            <Button
              buttonText='Upload File'
              buttonBg='primary'
              clickHandler={() => dispatch({ type: "openModal" })}
            ></Button>
          </div>
          <div className='files__table-wrapper'>
            <Table data={data} columns={columns} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Files;
