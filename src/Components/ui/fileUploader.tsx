import React, { FC, Fragment, useState, useEffect } from "react";
import FileUploader from "react-firebase-file-uploader";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getFireBaseStorage } from "../../firebase";

export interface IFileUploaderProps {
  dir: string;
  tag: string;
  defaultImg: string;
  defaultImgName: string;
  resetImage: () => void;
  onSuccessUpload: (filename: string) => void;
}
export interface IFileUploadState {
  name: string;
  isUploading: boolean;
  fileURL: string;
  defaultImg: string;
}
const ImageUploader: FC<IFileUploaderProps> = props => {
  const { tag, dir } = props;
  const defaultState: IFileUploadState = {
    name: "",
    isUploading: false,
    fileURL: "",
    defaultImg: ""
  };
  const [uploadState, setLoaderState] = useState<IFileUploadState>(
    defaultState
  );
  const { isUploading } = uploadState;
  useEffect(() => {
    setLoaderState({
      ...uploadState,
      name: props.defaultImgName,
      fileURL: props.defaultImg
      // isUploading:false
    });
  }, [props.defaultImg]);
  const handleUploadStart = () => {
    setLoaderState({ ...uploadState, isUploading: true });
  };
  const handleUploadError = () => {
    setLoaderState({ ...uploadState, isUploading: false });
  };
    const handleUploadSuccess = () => {
      
  };
  return (
    <div>
      {!uploadState.fileURL ? (
        <div>
          <div className="label_input">{tag}</div>
          <FileUploader
            accept="image/*"
            storageRef={getFireBaseStorage(dir)}
            name="image"
            randomizeFilename
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
          />
        </div>
      ) : null}
      {isUploading ? (
        <div
          className="progress"
          style={{ textAlign: "center", margin: "30px 0" }}
        >
          <CircularProgress
            style={{ color: "#98c6e9" }}
            thickness={7}
          ></CircularProgress>
        </div>
      ) : null}
    </div>
  );
};

export default ImageUploader;
