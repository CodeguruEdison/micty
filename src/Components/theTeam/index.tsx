import React, { FC, useState, useEffect } from "react";
import PlayerCard from "../ui/playerCard";
import Fade from "react-reveal/Fade";
import Stripes from "../../Resources/images/stripes.png";
import IPlayer from "../../models/IPlayer";
import { getPlayers, getPlayerImage } from "../../firebase";

interface ITheTeamProps {}
interface ITheTeamState {
  loading: boolean;
  players: IPlayer[];
}

export const TheTeam: FC<ITheTeamProps> = props => {
  const defaultTeamState: ITheTeamState = {
    loading: true,
    players: []
  };
  const [teamState, setTeamState] = useState<ITheTeamState>(defaultTeamState);

  useEffect(() => {
    getPlayers().then(players => {
      // console.log(players);
      let promises = [];
      for (let key in players) {
        promises.push(
          new Promise((resolve, reject) => {
            getPlayerImage("players", players[key].image).then(url => {
              players[key].url = url;
              resolve();
            });
          })
        );
      }
      Promise.all(promises).then(() => {
        setTeamState({
          ...teamState,
          loading: false,
          players
        });
        const grouped = players.reduce((g: any, player: IPlayer) => {
          g[player.position] = g[player.position] || []; //Check the value exists, if not assign a new array
          g[player.position].push(player); //Push the new value to the array
          return g; //Very important! you need to return the value of g or it will become undefined on the next pass
        }, {});
        for (let key in grouped) {
          console.log(key, grouped[key] as IPlayer[]);
        }

        //console.log(players);
      });
    });
  }, []);
  return (
    <div
      className="the_team_container"
      style={{ background: `url(${Stripes}) repeat` }}
    >
      {!teamState.loading ? (
        <div>
          <div className="team_category_wrapper">
            <div className="title">Keepers</div>
            <div className="team_cards"></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default TheTeam;
