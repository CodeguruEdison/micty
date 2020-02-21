import React, { FC, useState, useEffect } from "react";
import AdminLayout from "../../Hoc/AdminLayout";
import FormField from "../../ui/FormField";
import { validate, firebaseLooper } from "../../ui/misc";
import { ITeam } from "../../../models/ITeam";
import { IFormData, IUpdateForm } from "../../Home/Promotions/Enroll";
import FormEvent from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  getTeamOptions,
  getMatchById,
  getTeams,
  updateMatchById,
  addMatch
} from "../../../firebase";
import { IMatch } from "../../../models/IMatch";

export interface IAddEditMatchProps
  extends RouteComponentProps<{ id: string }> {}
export enum FormType {
  "Add Match",
  "Edit Match",
  Unknown
}
export interface IAddEditMatchState {
  matchId?: string;
  formType: FormType;
  formError: boolean;
  formSuccess: string;
  teams: ITeam[];
  formData: IFormData;
}

export const AddEditMatch: FC<IAddEditMatchProps> = props => {
  const initialData: IAddEditMatchState = {
    matchId: "",
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
          isRequired: true
          // isEmail: true
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
  const formTypeName = FormType[formType];
  const matchId = props.match.params.id || "";

  useEffect(() => {
    console.log(matchId);
    let foundMatch = {} as IMatch; //new typeof(IMatch);
    let teams = {} as ITeam[];
    if (!matchId) {
      ///ADD MATCH
      getTeams(foundMatch, formTypeName).then(result => {
        teams = result as ITeam[];
      });
      getTeamOptions(matchId).then(
        teamOptions => {
          //console.log(result);
          handleUpdateFields(
            foundMatch,
            teams,
            teamOptions,
            "Add Match",
            matchId
          );
        },
        error => {
          console.log(error);
        }
      );
    } else {
      getMatchById(matchId).then(result => {
        foundMatch = result as IMatch;
      });
      getTeams(foundMatch, formTypeName).then(result => {
        teams = result as ITeam[];
      });
      getTeamOptions(matchId).then(
        teamOptions => {
          //console.log(result);
          handleUpdateFields(
            foundMatch,
            teams,
            teamOptions,
            "Edit Match",
            matchId
          );
        },
        error => {}
      );
    }
  }, []);
  const handleUpdateFields = (
    match: IMatch,
    teams: ITeam[],
    teamOptions: { key: string; value: string }[],
    type: keyof typeof FormType,
    matchId: string
  ) => {
    const newFormData = {
      ...formData
    };
    type matchKeys = keyof IMatch;
    for (let key in newFormData) {
      if (match) {
        newFormData[key].value = (match[key as matchKeys] || "") as any;
        newFormData[key].isValid = true;
      }
      if (key === "local" || key === "away") {
        newFormData[key].config.options = teamOptions;
      }
    }
    /*const formType = FormType[type];
    console.log(newFormData);*/
    setMatchState({
      ...matchState,
      formType: FormType[type],
      matchId: matchId,
      formData: newFormData,
      teams: teams
    });
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

    setMatchState({ ...matchState, formData: formData, formError: false });
  };
  const successForm = (message: string) => {
    setMatchState({
      ...matchState,
      formSuccess: message
    });
    setTimeout(() => {
      setMatchState({
        ...matchState,
        formSuccess: ""
      });
    }, 2000);
  };
  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let dataToSubmit: { [k: string]: any } = {};
    let formIsValid = true;
    for (let element in formData) {
      const key = element as keyof IFormData;
      dataToSubmit[element] = formData[key].value;
      formIsValid = formData[key].isValid && formIsValid;
      //console.log(formData[keyOf].value);
    }
    matchState.teams.forEach(team => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit["localThmb"] = team.thmb;
      }
      if (team.shortName === dataToSubmit.away) {
        dataToSubmit["awayThmb"] = team.thmb;
      }
    });

    if (formIsValid) {
      if (matchState.formType === FormType["Edit Match"]) {
        try {
          await updateMatchById(matchState.matchId || "", dataToSubmit);
          successForm("Updated Successfully");
        } catch (e) {
          setMatchState({
            ...matchState,
            formError: true
          });
        }
      } else {
        try {
          await addMatch(dataToSubmit);
          props.history.push("/admin_matches");
        } catch (e) {
          setMatchState({
            ...matchState,
            formError: true
          });
        }
        ///Add Match
      }
      // console.log(dataToSubmit);
    } else {
      setMatchState({
        ...matchState,
        formError: true
      });
    }
  };
  const handleAddOrEdit = (e: React.FormEvent<HTMLButtonElement>) => {
    //console.log(e.currentTarget.innerText);
    //e.preventDefault();
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
              change={({ event, id }) => handleOnChange({ event, id })}
            ></FormField>

            <div className="select_team_layout">
              <div className="label_input">Local</div>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id={"local"}
                    formData={formData.local}
                    change={({ event, id }) => handleOnChange({ event, id })}
                  ></FormField>
                </div>
                <div>
                  <FormField
                    id={"resultLocal"}
                    formData={formData.resultLocal}
                    change={({ event, id }) => handleOnChange({ event, id })}
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
                    change={({ event, id }) => handleOnChange({ event, id })}
                  ></FormField>
                </div>
                <div>
                  <FormField
                    id={"resultAway"}
                    formData={formData.resultAway}
                    change={({ event, id }) => handleOnChange({ event, id })}
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
                change={({ event, id }) => handleOnChange({ event, id })}
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
                change={({ event, id }) => handleOnChange({ event, id })}
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
