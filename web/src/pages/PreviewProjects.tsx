import * as React from 'react';
import { Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import moment from 'moment';

import useToken from '../hooks/useToken';

import { getRepoListByUsername } from '../requests';


export default function PreviewProjects({user}:any) {
  const [rows, setRows] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { token, setToken } = useToken();

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    const repoList = await getRepoListByUsername(token!, user.login, newPage+1, rowsPerPage);
    setRows(repoList);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const size = parseInt(event.target.value, 10);
    setRowsPerPage(size);
    setPage(0);
    const repoList = await getRepoListByUsername(token!, user.login, 1, size);
    setRows(repoList);
  };

  React.useEffect(() => {
    const fetchData = () => {
      if(user) {
        getRepoListByUsername(token!, user.login, 1, 10)
          .then((repoList) => {
            setRows(repoList);
          })
      }
    };
    fetchData();
  }, [user]);

  return (
    <Box
      style={{
        minWidth: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ maxWidth: 700 }} elevation={6}>
        <CardContent>
          <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Repository</TableCell>
                  <TableCell align="center">Language</TableCell>
                  <TableCell align="center">Last updated</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row:any) => (
                  <TableRow
                    key={row.full_name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.full_name}
                    </TableCell>
                    <TableCell align="center">{row.language}</TableCell>
                    <TableCell align="center">{moment(row.updated_at).format('YYYY-MM-DD HH:mm')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions
          disableSpacing
          style={{
            justifyContent: 'center',
            height: '60px',
            paddingTop: '0px',
          }}
        >
          <TablePagination
            component="div"
            count={1000}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardActions>
      </Card>
    </Box>
  );
}
