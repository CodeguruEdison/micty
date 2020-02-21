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
  const [playerState, setPlayerState] = useState<IAddEditPlayerState>(
    initialState
  );
  const { formType } = playerState;
  const formTypeName = FormType[formType];
  const handleOnSubmit = () => {};
  return (
    <AdminLayout>
      <div className="editPlayers_dialog_wrapper">
        <h2>{formTypeName}</h2>
      </div>
      <div>
        <form onSubmit={handleOnSubmit}></form>
      </div>
    </AdminLayout>
  );
};
export default AddEditPlayer;
