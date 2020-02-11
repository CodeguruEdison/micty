import React, { FC, useState, ChangeEvent} from "react";
import Fade from "react-reveal/Fade";
import FormField from "../../ui/FormField";
import { validate } from "../../ui/misc";
import { firebasePromotions } from "../../../firebase";

export interface IEnrollData {
  formData: IFormData;
}
export interface IFormData {
  email: IEnrollElement;
  //test:IEnrollElement
}
export interface IElementConfig {
  name: string;
  type: string;
  placeholder: string;
}
export interface IValidationRule {
  isRequired: boolean;
  isEmail: boolean;
}
export interface IEnrollElement {
  element: string;
  value: string;
  config: IElementConfig;
  validation: IValidationRule;
  isValid: boolean;
  validationMessage: string;
}
export interface IEnrollState extends IEnrollData {
  isError: boolean;
  success: string;
}
export interface IUpdateForm {
  event: React.ChangeEvent<HTMLElement>;
  id: keyof IFormData;
}
export const Enroll: FC = () => {
  const initialState: IEnrollState = {
    isError: false,
    success: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          isRequired: true,
          isEmail: true
        },
        isValid: false,
        validationMessage: ""
      }
    }
  };
  const [enrollState, setEnrollState] = useState<IEnrollState>(initialState);
  const { formData } = enrollState;
  const submitForm = (e: HTMLFormElement) => {};

  /*function getProps<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
      }*/
  /*const getProperties = <T, K extends keyof T>(obj: T, key: K) => {
    return obj[key];
  };*/
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(e);

    let dataToSubmit: { [k: string]: any } = {};
    let formIsValid = true;
    for (let element in formData) {
      const key = element as keyof IFormData;
      dataToSubmit[element] = formData[key].value;
      formIsValid = formData[key].isValid && formIsValid;
      //console.log(formData[keyOf].value);
    }
    if (formIsValid) {
      //console.log(dataToSubmit);
      firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once('value')
      .then((snapshot)=>{
         // console.log('here');
          //console.log(snapshot.val());
          if(snapshot.val() === null ){
            firebasePromotions.push(dataToSubmit);
            resetFormSuccess(true)
          }
          else{
            resetFormSuccess(false);
          }
      })

      //resetFormSuccess();
    } else {
      // console.log('ERROR');
      setEnrollState({
        ...enrollState,
        isError: true
      });
    }

    e.preventDefault();
  };
  const resetFormSuccess = (inputType:boolean) => {
    const newFormData = { ...formData };
    for (let element in newFormData) {
      const key = element as keyof IFormData;
      newFormData[key].value = "";
      newFormData[key].isValid = false;
      newFormData[key].validationMessage = "";
    }
    setEnrollState({ ...enrollState,
         formData: newFormData, 
         isError: false,
         success: inputType ?'Congratulations' :'Already on the  Database'
         });
     successMessage();    
  };
  const successMessage = () => {
    setTimeout(()=>{
        setEnrollState({
            ...enrollState,
            success:''
        })

    
    },2000);
  }
  const updateForm = (element: IUpdateForm) => {
    // console.log(element);
    const newFormData = { ...formData };
    // console.log(newFormData[element.id]);
    // const newElement = {...newFormData[Object.keys[newFormData][element.id]}
    // const id:any = element.id;
    //console.log(element.id);
    //  console.log(newFormData[id]);
    if (element.event.target instanceof HTMLInputElement) {
      const currentTarget = element.event.target as HTMLInputElement;
      const newElement = { ...newFormData[element.id] };
      newElement.value = element.event.target.value;

      let validData = validate(newElement);
      newElement.isValid = validData[0].isValid;
      newElement.validationMessage = validData[0].message;

      newFormData[element.id] = newElement;
      console.log(newFormData);

      setEnrollState({ ...enrollState, formData: newFormData, isError: false });

      //console.log(currentTarget.value);
    }
    //console.log(typeof(event.target));
    //const htmlElement = event.type
    //console.log(event.target.value);
  };
  return (
    <Fade>
      <div className="enroll_wrapper">
        <form onSubmit={e => submitForm}>
          <div className="enroll_title">Enter you Email</div>
          <div className="enroll_input">
            <FormField
              id={"email"}
              formData={formData.email}
              change={({ event, id }) => updateForm({ event, id })}
            ></FormField>
            {enrollState.isError ? (
              <div className="error_label">Error</div>
            ) : null}
            <div className="success_label">{enrollState.success}</div>
            <button onClick={handleSubmit}>Enroll</button>
            <div className="enroll_discl">Enroll disclaimer goes here</div>
          </div>
        </form>
      </div>
    </Fade>
  );
};
export default Enroll;
