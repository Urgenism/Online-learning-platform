import React, { useReducer, ChangeEvent, FormEvent, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import "./Files.css";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import Table from "components/Table/Table";
import FileDropzone from "components/FileDropzone/FIleDropzone";
import ApiService from "services/Apis";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AiOutlineDownload } from "react-icons/ai";
import { RiFileList3Line } from "react-icons/ri";

const filesApi = new ApiService({});

const initialState = { showModal: false, files: [], tableData: [] };

const supportedFileTypes = [
  "jpeg",
  "png",
  "jpg",
  "pdf",
  "pptx",
  "docx",
  "ipynb",
  "xlsx",
];

const findDuplicate = (arr: Array<any>) => {
  return arr.reduce((acc, currentValue, index, array) => {
    if (array.indexOf(currentValue) !== index && !acc.includes(currentValue))
      acc.push(currentValue);
    return acc;
  }, []);
};

const validateFiles = (arr: Array<any>, duplicateFileName: Array<any>) => {
  return arr.map((file: any) => {
    if (duplicateFileName.includes(file.fileName.trim())) {
      return { ...file, error: "Duplicate resource title" };
    }
    if (!supportedFileTypes.includes(file.fileExtension)) {
      return {
        ...file,
        error: "Supported files: pdf, pptx, docx, xlsx, ipynb, jpg, jpeg, png",
      };
    }
    return { ...file, error: "" };
  });
};

function reducer(state: typeof initialState, action: any) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, showModal: true };
    case "CLOSE_MODAL":
      return { ...state, showModal: false };
    case "POPULATE_TABLE_DATA": {
      return { ...state, tableData: action.payload };
    }
    case "SET_FILES": {
      let filesNames: any = [];
      let files = action.payload.map((file: any) => {
        const _splittedFileName = file.name.split(".");
        const fileName = _splittedFileName
          .slice(0, _splittedFileName.length - 1)
          .join(".");
        const fileSize = file.size;
        const fileExtension = _splittedFileName[_splittedFileName.length - 1];
        let error = "";
        filesNames.push(fileName);
        return { file, fileName, fileSize, fileExtension, error };
      });

      const duplicateFileName = findDuplicate(filesNames);
      files = validateFiles(files, duplicateFileName);

      return { ...state, files: files };
    }

    case "REMOVE_FILE":
      let updatedFiles: any = state.files.filter(
        (file: any, index) => index !== action.payload
      );

      const filesNames = updatedFiles.map((file: any) => file.fileName);
      const duplicateFileName = findDuplicate(filesNames);

      updatedFiles = validateFiles(updatedFiles, duplicateFileName);

      return { ...state, files: updatedFiles };

    case "RENAME_FILENAME": {
      let filesNames: any = [];
      let updatedFiles = state.files.map((file: any, index) => {
        if (index === action.payload.fileIndex) {
          // const fileExtension = file.name.split(".")[1];
          // const fileType = file.type;
          // // const blob = file.slice(0, file.size, fileType);
          // const updatedFile = new File(
          //   [file],
          //   `${action.payload.fileName}.${fileExtension}`,
          //   { type: `${fileType}` }
          filesNames.push(action.payload.fileName.trim());
          return { ...file, fileName: action.payload.fileName };
        }
        filesNames.push(file.fileName.trim());
        return file;
      });

      const duplicateFileName = findDuplicate(filesNames);
      updatedFiles = validateFiles(updatedFiles, duplicateFileName);

      return { ...state, files: updatedFiles };
    }
    default:
      return state;
  }
}

interface TProps extends RouteComponentProps {}

const Files: React.FC<TProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const { id: courseId }: any = props.match.params;
    filesApi
      .get(`/files/courseId/${courseId}`)
      .then((response: any) => {
        if (response) {
          const formattedTableData = response.files.map((file: any) => ({
            name: { name: file.fileName, path: file.filePath },
            dateAdded: response.createdAt.split("T")[0],
            lastModified: response.updatedAt.split("T")[0],
            size: file.fileSize,
            // path: file.filePath,
          }));
          dispatch({
            type: "POPULATE_TABLE_DATA",
            payload: formattedTableData,
          });
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);
        toast.error("Unable to fetch files data");
      });
  }, [props.match.params]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: (cellInfo: any) => {
          return (
            <div>
              {cellInfo.value.name}
              <a href={cellInfo.value.path} className='table__download-btn'>
                <AiOutlineDownload />
              </a>
            </div>
          );
        },
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

  const fileNameChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    fileIndex: number
  ) => {
    dispatch({
      type: "RENAME_FILENAME",
      payload: { fileName: e.target.value, fileIndex },
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("handleSUbmit");
  };

  return (
    <div>
      <Modal
        modalTitle='Upload Files'
        showModal={state.showModal}
        closeModal={() => dispatch({ type: "CLOSE_MODAL" })}
      >
        <form onSubmit={handleSubmit}>
          <FileDropzone
            stateFiles={state.files}
            closeModal={() => dispatch({ type: "CLOSE_MODAL" })}
            setFiles={(acceptedFiles) =>
              dispatch({ type: "SET_FILES", payload: acceptedFiles })
            }
            removeFile={(file) =>
              dispatch({ type: "REMOVE_FILE", payload: file })
            }
            fileNameChangeHandler={fileNameChangeHandler}
          />
        </form>
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
            <li className='files__sidebar-item active'>
              <RiFileList3Line className='files__sidebar-icon' />
              Files
            </li>
          </ul>
        </aside>
        <div className='files__content'>
          <div className='files__title-wrap'>
            <h2 className='files__title'>Files and Folders</h2>
            <Button
              buttonText='Upload File'
              buttonBg='primary'
              clickHandler={() => dispatch({ type: "OPEN_MODAL" })}
            ></Button>
          </div>
          <div className='files__table-wrapper'>
            <Table data={state.tableData} columns={columns} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Files;
