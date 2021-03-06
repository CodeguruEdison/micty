import React, { FC } from "react";
import Featured from "./Featured";
import Matches from "./Matches";
import MeetPlayers from "./Players";
import Promotion from "./Promotions";

export const Home: FC = () => {
  return (
    <div className="bck_blue">
      <Featured></Featured>
      <Matches></Matches>
      <MeetPlayers />

      <Promotion></Promotion>
    </div>
  );
};
