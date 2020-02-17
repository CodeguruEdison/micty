import React, { FC } from "react";
import { IUpdateForm, IFormData } from "../Home/Promotions/Enroll";

export type Editor = "input" | "multilinetextbox" | "dropdown" | "select";
export interface IFormFieldConfig {
  editor: Editor;
  value: string;
  config: {
    name: string;
    type: string;
    label?: string;
    options?: any[];
    //placeholder:string
  };
  validation: {
    [k: string]: boolean;
    /*isRequired: boolean;
    isEmail: boolean;*/
  };
  isValid: boolean;
  validationMessage: string;
  showLabel?: boolean;
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
    switch (formData.editor) {
      case "input":
        formTemplate = (
          <div>
            {formData.showLabel ? (
              <div className="label_inputs">{formData.config.label}</div>
            ) : null}
            <input
              {...formData.config}
              value={formData.value}
              onChange={event => change({ event, id })}
            ></input>
            {showError(formData)}
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <div>
            {formData.showLabel ? (
              <div className="label_inputs">{formData.config.label}</div>
            ) : null}
            <select
              value={formData.value}
              onChange={event => change({ event, id })}
            >
              <option value="">Select One</option>
              {formData.config.options?.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
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
