import React, { FC, useState, useEffect } from "react";
import { getMatches } from "../../../firebase";
import { IMatch } from "../../../models/IMatch";
import { reverseArray } from "../../ui/misc";
import MatchesBlock from "../../ui/matches_block";
import Slide from "react-reveal/Slide";

export const Blocks: FC = () => {
  const [matches, setMatches] = useState<IMatch[]>([]);
  useEffect(() => {
    getMatches(6).then(matches => {
      setMatches(reverseArray(matches));
      console.log(matches);
    });
  }, []);

  //console.log(matches);

  const showMatches = (matches: IMatch[]) =>
    matches
      ? matches.map(match => (
          <Slide bottom key={match.id}>
            <div className="item">
              <div className="wrapper">
                <MatchesBlock match={match}></MatchesBlock>
              </div>
            </div>
          </Slide>
        ))
      : null;

  return <div className="home_matches">{showMatches(matches)}</div>;
};
export default Blocks;
