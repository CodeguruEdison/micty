import React, { FC, Fragment, useState, useEffect } from "react";
import FileUploader from "react-firebase-file-uploader";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getFireBaseStorage, firebase, getPlayerImage } from "../../firebase";

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
  const { tag, dir, onSuccessUpload, resetImage } = props;
  const defaultState: IFileUploadState = {
    name: "",
    isUploading: false,
    fileURL: "",
    defaultImg: ""
  };
  const [uploadState, setLoaderState] = useState<IFileUploadState>(
    defaultState
  );
  const { isUploading, fileURL } = uploadState;
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
  const handleUploadError = (error: any) => {
    console.log(error);
    setLoaderState({ ...uploadState, isUploading: false });
  };
  const handleUploadSuccess = async (filename: string) => {
    console.log(filename);
    setLoaderState({
      ...uploadState,
      name: filename,
      isUploading: false
    });
    const fileURL = await getPlayerImage(dir, filename);
    console.log(fileURL);
    setLoaderState({
      ...uploadState,
      fileURL: fileURL
    });
    onSuccessUpload(filename);
  };
  const handleRemove = () => {
    console.log("handleRemove clicked");    
    setLoaderState({
      ...uploadState,
      name: "",
      fileURL: "",
      isUploading: false
    });
    resetImage();
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
      {uploadState.fileURL ? (
        <div className="image_upload_container">
          <img style={{ width: "100%" }} src={fileURL} alt={uploadState.name} />
          <div className="remove" onClick={() => handleRemove()}>
            Remove
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageUploader;
