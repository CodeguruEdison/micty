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
import { getMatches } from "../../../firebase";
import { IMatch } from "../../../models/IMatch";
import CircularProgress from "@material-ui/core/CircularProgress";

export interface IAdminMatchesProps {}
export interface IAdminMatchesState {
  isLoading: boolean;
  matches: IMatch[];
}
const AdminMatches: FC<IAdminMatchesProps> = props => {
  const [matchState, setMatches] = useState<IAdminMatchesState>({
    isLoading: true,
    matches: []
  });
  useEffect(() => {
    getMatches(100).then((matches: IMatch[]) => {
      setMatches({
        ...matches,
        isLoading: false,
        matches: matches
      });
    });
  }, []);
  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });
  const classes = useStyles();
  console.log(matchState.matches);

  return (
    <AdminLayout>
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Match</TableCell>
                <TableCell align="right">Result</TableCell>
                <TableCell align="right">Final</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matchState.matches
                ? matchState.matches.map(row => (
                    <TableRow key={row.id}>
                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell align="right">
                        <Link to={`/admin_matches/edit_match/${row.id}`}>
                          {row.away} <strong>-</strong> {row.local}
                        </Link>
                      </TableCell>
                      <TableCell align="right">{row.result}</TableCell>
                      <TableCell align="right">
                        {row.final === "Yes" ? (
                          <span className="matches_tag_red">Final</span>
                        ) : (
                          <span className="matches_tag_green">
                            Not Played yet
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="admin_progress">
          {matchState.isLoading ? (
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
export default AdminMatches;
