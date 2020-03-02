import React, { FC, FormEvent, useState } from "react";
import { IFormData, IUpdateForm } from "../Home/Promotions/Enroll";
import { validate } from "../ui/misc";
import FormField from "../ui/FormField";
import { firebaseAuth } from "../../firebase";
import { RouteComponentProps } from "react-router-dom";
export interface ISignData {
  formData: IFormData;
}
//https://www.carlrippon.com/building-super-simple-react-form-component-typescript-basics/
interface IFormProps extends RouteComponentProps<any> {
  /* The http path that the form will be posted to */
  action: string;
}
/*export interface ISignState {
  [k: string]: IFormElement;
}*/
export interface ISignState extends ISignData {
  isError: boolean;
  success: string;
}

const SignIn: FC<IFormProps> = props => {
  const { history } = props;
  const initialState: ISignState = {
    isError: false,
    success: "",
    formData: {
      email: {
        editor: "input",
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
      },
      password: {
        editor: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          isRequired: true
          //isEmail: true
        },
        isValid: false,
        validationMessage: ""
      }
    }
  };
  const [signInState, setSignInState] = useState<ISignState>(initialState);
  const { formData } = signInState;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
      console.log(dataToSubmit);
      firebaseAuth
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          console.log("user is auth");
          history.push("/dashboard");
        })
        .catch(() => {
          setSignInState({
            ...signInState,
            isError: true
          });
        });
    } else {
      // console.log('ERROR');
      setSignInState({
        ...signInState,
        isError: true
      });
    }

    e.preventDefault();
  };
  const updateForm = (element: IUpdateForm) => {
    const newFormData = { ...formData };
    // console.log(newFormData[element.id]);
    // const newElement = {...newFormData[Object.keys[newFormData][element.id]}
    // const id:any = element.id;
    //console.log(element.id);
    //  console.log(newFormData[id]);
    if (element.event?.target instanceof HTMLInputElement) {
      const newElement = { ...newFormData[element.id] };
      newElement.value = element.event?.target.value;

      let validData = validate(newElement);
      newElement.isValid = validData[0].isValid;
      newElement.validationMessage = validData[0].message;

      newFormData[element.id] = newElement;
      console.log(newFormData);

      setSignInState({
        ...signInState,
        formData: newFormData,
        isError: false
      });

      //console.log(currentTarget.value);
    }
  };
  return (
    <div className="div">
      <div className="container">
        <div className="signin_wrapper" style={{ margin: "100px" }}>
          <form onSubmit={handleSubmit}>
            <h2>Please login</h2>
            <FormField
              id={"email"}
              formData={formData.email}
              change={({ event, id }) => updateForm({ event, id })}
            ></FormField>
            <FormField
              id={"password"}
              formData={formData.password}
              change={({ event, id }) => updateForm({ event, id })}
            ></FormField>
            {signInState.isError ? (
              <div className="error_label">Error</div>
            ) : null}
            <button onClick={() => handleSubmit}>SignIn</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
