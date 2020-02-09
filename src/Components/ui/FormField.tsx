import React, { FC, ChangeEvent, SyntheticEvent } from "react";
import { IUpdateForm, IFormData } from "../Home/Promotions/Enroll";

export interface IFormFieldConfig {
  element: string;
  value: string;
  config: {
    name: string;
    type: string;
    //placeholder:string
  };
  validation: {
    isRequired: boolean;
    isEmail: boolean;
  };
  isValid: boolean;
  validationMessage: string;
}
export interface IFormFieldsProps {
  id: keyof IFormData;
  formData: IFormFieldConfig;
  //change:(element:any)=>void;
  // change:({event:React.ChangeEvent<HTMLElement>,id:string});
  change: (element: IUpdateForm) => void;
}

const FormField: FC<IFormFieldsProps> = props => {
  const { id, formData, change } = props;

  const showError = (formField: IFormFieldConfig) => {
    const errorMessage = (
      <div className="error_label">
        {formField.validation && !formField.isValid
          ? formField.validationMessage
          : null}
      </div>
    );
    return errorMessage;
  };
  const renderTemplate = () => {
    let formTemplate = null;
    switch (formData.element) {
      case "input":
        formTemplate = (
          <div>
            <input
              {...formData.config}
              value={formData.value}
              onChange={event => change({ event, id })}
            ></input>
            {showError(formData)}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };
  return <div>{renderTemplate()}</div>;
};
export default FormField;
