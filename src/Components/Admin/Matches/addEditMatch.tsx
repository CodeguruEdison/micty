import React, { FC, useState } from "react";
import AdminLayout from "../../Hoc/AdminLayout";
import FormField from "../../ui/FormField";
import { validate } from "../../ui/misc";
import { ITeam } from "../../../models/ITeam";
import { IFormData } from "../../Home/Promotions/Enroll";
import FormEvent from "react";

export interface IAddEditMatchProps {}
export enum FormType {
  Add,
  Edit,
  Unknown
}
export interface IAddEditMatchState {
  matchId?: number;
  formType: FormType;
  formError: boolean;
  formSuccess: string;
  teams: ITeam[];
  formData: IFormData;
}

export const AddEditMatch: FC<IAddEditMatchProps> = props => {
  const initialData: IAddEditMatchState = {
    matchId: 0,
    formType: FormType.Unknown,
    formError: false,
    formSuccess: "",
    teams: [],
    formData: {
      date: {
        editor: "input",
        value: "",
        config: {
          label: "Event Date",
          name: "date_input",
          type: "date",
          placeholder: ""
        },
        validation: {
          isRequired: true,
          isEmail: true
        },
        isValid: false,
        validationMessage: "",
        showLabel: true
      },
      local: {
        editor: "select",
        value: "",
        config: {
          label: "Select a local team",
          name: "select_local",
          type: "select",
          options: []
        },
        validation: {
          isRequired: true
        },
        isValid: false,
        validationMessage: "",
        showLabel: false
      },
      resultLocal: {
        editor: "input",
        value: "",
        config: {
          label: "Result Local",
          name: "result_local_input",
          type: "text",
          placeholder: ""
        },
        validation: {
          isRequired: true
        },
        isValid: false,
        validationMessage: "",
        showLabel: false
      },
      away: {
        editor: "select",
        value: "",
        config: {
          label: "Select a away team",
          name: "select_away",
          type: "select",
          options: []
        },
        validation: {
          isRequired: true
        },
        isValid: false,
        validationMessage: "",
        showLabel: false
      },
      resultAway: {
        editor: "input",
        value: "",
        config: {
          label: "Result Away",
          name: "result_away_input",
          type: "text",
          placeholder: ""
        },
        validation: {
          isRequired: true
        },
        isValid: false,
        validationMessage: "",
        showLabel: false
      },
      referee: {
        editor: "input",
        value: "",
        config: {
          label: "Referee",
          name: "referee_input",
          type: "text",
          placeholder: ""
        },
        validation: {
          isRequired: true
        },
        isValid: false,
        validationMessage: "",
        showLabel: true
      },
      stadium: {
        editor: "input",
        value: "",
        config: {
          label: "Stadium",
          name: "stadium_input",
          type: "text",
          placeholder: ""
        },
        validation: {
          isRequired: true
        },
        isValid: false,
        validationMessage: "",
        showLabel: true
      },
      result: {
        editor: "select",
        value: "",
        config: {
          label: "Team Result",
          name: "select_result",
          type: "select",
          options: [
            { key: "W", value: "W" },
            { key: "L", value: "L" },
            { key: "D", value: "D" },
            { key: "n/a", value: "n/a" }
          ]
        },
        validation: {
          isRequired: true
        },
        isValid: false,
        validationMessage: "",
        showLabel: true
      },
      final: {
        editor: "select",
        value: "",
        config: {
          label: "Game Played ?",
          name: "select_final",
          type: "select",
          options: [
            { key: "Yes", value: "Yes" },
            { key: "No", value: "No" }
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
  const [matchState, setMatchState] = useState<IAddEditMatchState>(initialData);
  const { formData, formType } = matchState;
  const formTypeName = FormType[matchState.formType];
  const handleOnChange = () => {};
  const handleOnSubmit = () => {};
  const handleAddOrEdit = (e: React.FormEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.innerText);
    e.preventDefault();
  };
  return (
    <AdminLayout>
      <div className="editmatch_dialog_wrapper">
        <h2>{formTypeName}</h2>
        <div>
          <form onSubmit={handleOnSubmit}>
            <FormField
              id={"date"}
              formData={formData.date}
              change={handleOnChange}
            ></FormField>

            <div className="select_team_layout">
              <div className="label_input">Local</div>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id={"local"}
                    formData={formData.local}
                    change={handleOnChange}
                  ></FormField>
                </div>
                <div>
                  <FormField
                    id={"resultLocal"}
                    formData={formData.resultLocal}
                    change={handleOnChange}
                  ></FormField>
                </div>
              </div>
            </div>
            <div className="select_team_layout">
              <div className="label_input">Away</div>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id={"away"}
                    formData={formData.away}
                    change={handleOnChange}
                  ></FormField>
                </div>
                <div>
                  <FormField
                    id={"resultAway"}
                    formData={formData.resultAway}
                    change={handleOnChange}
                  ></FormField>
                </div>
              </div>
            </div>
            <div className="split_fields">
              <FormField
                id={"referee"}
                formData={formData.referee}
                change={handleOnChange}
              ></FormField>
              <FormField
                id={"stadium"}
                formData={formData.stadium}
                change={handleOnChange}
              ></FormField>
            </div>
            <div className="split_fields last">
              <FormField
                id={"result"}
                formData={formData.result}
                change={handleOnChange}
              ></FormField>
              <FormField
                id={"final"}
                formData={formData.final}
                change={handleOnChange}
              ></FormField>
            </div>
            <div className="success_label">{matchState.formSuccess}</div>
            {matchState.formError ? (
              <div className="error_label">Something went wrong</div>
            ) : null}
            <div className="admin_submit">
              <button onClick={handleAddOrEdit}>{formTypeName}</button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};
