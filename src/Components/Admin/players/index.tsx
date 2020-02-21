import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AdminLayout from "../../Hoc/AdminLayout";
import { getPlayers } from "../../../firebase";
import { IMatch } from "../../../models/IMatch";
import CircularProgress from "@material-ui/core/CircularProgress";
import IPlayer from "../../../models/IPlayer";
export interface IAdminPlayersProps {}
export interface IAdminPlayerState {
  isLoading: boolean;
  players: IPlayer[];
}

const AdminPlayers: FC<IAdminPlayersProps> = props => {
  const [playersState, setPlayers] = useState<IAdminPlayerState>({
    isLoading: true,
    players: []
  });
  const { players } = playersState;
  const loadPlayers = async () => {
    const players = await getPlayers();
    console.log(players);
    setPlayers({
      ...playersState,
      isLoading: false,
      players: players
    });
  };
  useEffect(() => {
    loadPlayers();
  }, []);
  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });
  return (
    <AdminLayout>
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">Number</TableCell>
                <TableCell align="left">Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playersState.players
                ? playersState.players.map(row => (
                    <TableRow key={row.id}>
                      <TableCell align="left">
                        <Link to={`/admin_players/add_players/${row.id}`}>
                          {row.name}
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        <Link to={`/admin_players/add_players/${row.id}`}>
                          {row.lastname}
                        </Link>
                      </TableCell>
                      <TableCell align="left">{row.number}</TableCell>
                      <TableCell align="left">{row.position}</TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="admin_progress">
          {playersState.isLoading ? (
            <CircularProgress
              thickness={7}
              style={{ color: "#98c5e9" }}
            ></CircularProgress>
          ) : (
            ""
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPlayers;
