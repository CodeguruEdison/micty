import React, { FC, useState, useEffect } from "react";
import AdminLayout from "../../Hoc/AdminLayout";
import FormField from "../../ui/FormField";
import { validate, firebaseLooper } from "../../ui/misc";
import { ITeam } from "../../../models/ITeam";
import { IFormData, IUpdateForm } from "../../Home/Promotions/Enroll";
import FormEvent from "react";
import { RouteComponentProps } from "react-router-dom";
import { IAddEditMatchProps } from "../Matches/addEditMatch";
import {
  getTeamOptions,
  getMatchById,
  getTeams,
  updateMatchById,
  addMatch
} from "../../../firebase";

export interface IAddEditPlayerProps
  extends RouteComponentProps<{ id: string }> {}
export enum FormType {
  "Add Player",
  "Edit Player",
  Unknown
}
export interface IAddEditPlayerState {
  playerId?: string;
  formType: FormType;
  formError: boolean;
  formSuccess: string;
  defaultImg: string;
  //teams: ITeam[];
  formData: IFormData;
}
const AddEditPlayer: FC<IAddEditPlayerProps> = props => {
  const initialState: IAddEditPlayerState = {
    playerId: "",
    defaultImg: "",
    formError: false,
    formSuccess: "",
    formType: FormType.Unknown,
    formData: {
      name: {
        editor: "input",
        value: "",
        config: {
          label: "Player Name",
          name: "name_input",
          type: "text",
          placeholder: ""
        },
        validation: {
          isRequired: true
          // isEmail: true
        },
        isValid: false,
        validationMessage: "",
        showLabel: true
      },
      lastname: {
        editor: "input",
        value: "",
        config: {
          label: "Player Last Name",
          name: "lastname_input",
          type: "text",
          placeholder: ""
        },
        validation: {
          isRequired: true
          // isEmail: true
        },
        isValid: false,
        validationMessage: "",
        showLabel: true
      },
      number: {
        editor: "input",
        value: "",
        config: {
          label: "Player Number",
          name: "number_input",
          type: "text",
          placeholder: ""
        },
        validation: {
          isRequired: true
          // isEmail: true
        },
        isValid: false,
        validationMessage: "",
        showLabel: true
      },
      position: {
        editor: "select",
        value: "",
        config: {
          label: "Select a position",
          name: "select_position",
          type: "select",
          options: [
            { key: "Keeper", value: "Keeper" },
            { key: "Defence", value: "Defence" },
            { key: "MidField", value: "MidField" },
            { key: "Striker", value: "Striker" }
          ]
        },
        validation: {
          isRequired: true
        },
        isValid: false,
        validationMessage: "",
        showLabel: true
      }
    }
  };
  const playerId = props.match.params.id || null;
  const [playerState, setPlayerState] = useState<IAddEditPlayerState>(
    initialState
  );
  useEffect(() => {
    if (!playerId) {
      setPlayerState({
        ...playerState,
        formType: FormType["Add Player"]
      });
    }
  }, []);
  const { formType, formData } = playerState;
  const formTypeName = FormType[formType];
  const handleOnSubmit = async (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    let dataToSubmit: { [k: string]: any } = {};
    let formIsValid = true;
    for (let element in formData) {
      const key = element as keyof IFormData;
      dataToSubmit[element] = formData[key].value;
      formIsValid = formData[key].isValid && formIsValid;
      //console.log(formData[keyOf].value);
    }
    console.log(formIsValid);
    if (formIsValid) {
    } else {
      setPlayerState({
        ...playerState,
        formError: true
      });
    }
    event.preventDefault();
  };
  const handleOnChange = (element: IUpdateForm) => {
    console.log(element);
    const newElement = { ...formData[element.id] };
    //console.log((element.event.target as any).value);
    newElement.value = (element.event.target as any).value;

    let validData = validate(newElement);
    newElement.isValid = validData[0].isValid;
    newElement.validationMessage = validData[0].message;

    formData[element.id] = newElement;
    console.log(formData);

    setPlayerState({ ...playerState, formData: formData, formError: false });
  };
  return (
    <AdminLayout>
      <div className="editplayers_dialog_wrapper">
        <h2>{formTypeName}</h2>

        <div>
          <form onSubmit={handleOnSubmit} className="form-group">
            <FormField
              id={"name"}
              formData={formData.name}
              change={({ event, id }) => handleOnChange({ event, id })}
            ></FormField>
            <FormField
              id={"lastname"}
              formData={formData.lastname}
              change={({ event, id }) => handleOnChange({ event, id })}
            ></FormField>
            <FormField
              id={"number"}
              formData={formData.number}
              change={({ event, id }) => handleOnChange({ event, id })}
            ></FormField>
            <FormField
              id={"position"}
              formData={formData.position}
              change={({ event, id }) => handleOnChange({ event, id })}
            ></FormField>
            <div className="success_label">{playerState.formSuccess}</div>
            {playerState.formError ? (
              <div className="error_label">Something went wrong</div>
            ) : null}
            <div className="admin_submit">
              <button onClick={handleOnSubmit}>{formTypeName}</button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};
export default AddEditPlayer;
