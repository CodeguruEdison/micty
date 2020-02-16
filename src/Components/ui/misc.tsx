import React, { FC } from "react";
import { Link } from "react-router-dom";
import { IMiscProps } from "../../models/IMiscProp";
import { IMatch } from "../../models/IMatch";
import { IFormElement } from "../Home/Promotions/Enroll";

export const Tag: FC<IMiscProps> = props => {
  const { islink, linkto, background, fontSize, color, children, add } = props;
  const style = {
    background,
    fontSize: fontSize,
    color,
    padding: "5px 10px",
    display: "inline-block",
    fontFamily: "Righteous",
    ...add
  };
  const template = <div style={style}>{children}</div>;
  if (islink) {
    return <Link to={linkto}>{template}</Link>;
  } else {
    return template;
  }
};
export default Tag;

export const firebaseLooper = (
  snapshot: firebase.database.DataSnapshot
): IMatch[] => {
  const data: IMatch[] = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};
export const reverseArray = (actualArray: Array<any>) => {
  let reversedArray = [];
  for (let i = actualArray.length - 1; i > 0; i--) {
    reversedArray.push(actualArray[i]);
  }
  return reversedArray;
};
export const validate = (inputElement: IFormElement) => {
  let error = [{ isValid: true, message: "" }];
  //const default:{isValid:boolean,message:string} = {isValid:true,message:''};
  if (inputElement.validation.isEmail) {
    const isValid = /\S+@\S+\.\S+/.test(inputElement.value);
    const message = `${!isValid ? "Must be a valid email" : ""}`;
    error = !isValid ? [{ isValid, message }] : error;
  }

  if (inputElement.validation.isRequired) {
    const isValid = inputElement.value.trim() !== "";
    const message = `${!isValid ? "This field is required" : ""}`;
    error = !isValid ? [{ isValid, message }] : error;
    //error.push(isInValid,message);
  }
  return error;
};
