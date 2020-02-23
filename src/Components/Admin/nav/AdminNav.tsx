import React, { CSSProperties } from "react";
import { FC } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { ListItem } from "@material-ui/core";
import { firebaseAuth } from "../../../firebase";
export interface IAdminNavProps {}
export interface IAdminNavLink {
  title: string;
  linkTo: string;
}

export const AdminNav: FC<IAdminNavProps> = props => {
  const links: IAdminNavLink[] = [
    {
      title: "Matches",
      linkTo: "/admin_matches"
    },
    {
      title: "Add Match",
      linkTo: "/admin_matches/edit_match"
    },
    {
      title: "Players",
      linkTo: "/admin_players"
    },
    {
      title: "Add Players",
      linkTo: "/admin_players/add_players"
    }
  ];
  const listStyle: CSSProperties = {
    color: "#ffffff",
    fontWeight: 300,
    borderBottom: "1px solid #353535"
  };
  const handleLogOut = async () => {
    try {
      await firebaseAuth.signOut();
      console.log("Log Out successful");
    } catch (error) {
      console.log("Error Logging Out");
    }
  };

  const renderItems = (links: IAdminNavLink[]) =>
    links.map(link => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button style={listStyle}>
          {link.title}
        </ListItem>
      </Link>
    ));
  return (
    <div>
      {renderItems(links)}
      <ListItem button style={listStyle} onClick={handleLogOut}>
        SignOut
      </ListItem>
    </div>
  );
};
