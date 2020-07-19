import React, { useMemo, useCallback, ChangeEvent } from "react";
import { useDropzone, DropzoneInputProps } from "react-dropzone";
import "./FileDropzone.css";

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

type TProps = {
  stateFiles: Array<any>;
  closeModal: () => void;
  setFiles: (fileList: Array<any>) => void;
  removeFile: (fileIndex: number) => void;
  fileNameChangeHandler: (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
};

const FileDropzone: React.FC<TProps> = ({
  stateFiles,
  closeModal,
  setFiles,
  removeFile,
  fileNameChangeHandler,
}) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: onDrop,
    multiple: true,
    maxSize: 52428800,
  });

  const files = stateFiles.map(
    (
      { file, fileName, fileExtension, fileSize, error }: any,
      index: number
    ) => {
      return (
        <li key={file.size + index} className='dropzone__file-item'>
          <div className='dropzone__input-wrap'>
            <input
              type='text'
              value={fileName}
              onChange={(e) => fileNameChangeHandler(e, index)}
              className='dropzone__file-input'
            />
            {error && <div className='dropzone__file-error'>{error}</div>}
          </div>
          <div className='dropzone__file-info'>
            <span className='dropzone__filesize-info'>
              .{fileExtension} ({formatBytes(fileSize, 2)})
            </span>
            <button
              type='button'
              className='dropzone__btn'
              onClick={() => removeFile(index)}
            >
              Remove
            </button>
          </div>
        </li>
      );
    }
  );

  const className = useMemo(() => {
    let className = "dropzone";
    if (isDragActive) {
      className = "dropzone is-drag-active";
    }
    if (isDragAccept) {
      className = "dropzone is-drag-accept";
    }
    if (isDragReject) {
      className = "dropzone is-drag-reject";
    }
    return className;
  }, [isDragActive, isDragReject, isDragAccept]);

  return (
    <div className='dropzone-wrapper'>
      <div {...getRootProps({ className: className })}>
        <input {...getInputProps()} />
        <p className='dropzone__info'>
          <strong>
            Drag and Drop or <span className='color-primary'>Browse</span> file
          </strong>
        </p>
        <p className='dropzone__info-file'>
          pdf, pptx, docx, xlsx, ipynb, jpg, jpeg, png files only(Max files size
          50 MB)
        </p>
      </div>
      <aside>
        <ul className='dropzone__file-list'>{files}</ul>
      </aside>
      {stateFiles.length > 0 && (
        <div className='dropzone__btns'>
          <button className='btn gray' type='button' onClick={closeModal}>
            Cancel
          </button>
          <button className='btn primary' type='submit'>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
