import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useHistory} from "react-router-dom";

function createData(id, name, address, created_at) {
    return {id, name, address, created_at};
}

const rows = [
    createData(1, 'Proveedor 1', 'CAlle ajajaj', 24),
    createData(2, 'Proveedor 2', 'CAlle ajajaj', 37),
    createData(3, 'Proveedor 3', 'CAlle ajajaj', 6.0),
    createData(4, 'Proveedor 4', 'CAlle ajajaj', 67),
    createData(5, 'Proveedor 5', 'CAlle ajajaj', 49),
];

function Provider() {
    const history = useHistory();
    return (
        <>
            <Button onClick={() => history.push('provider/create')} variant="contained">Crear</Button>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="right">name</TableCell>
                            <TableCell align="right">address</TableCell>
                            <TableCell align="right">created_at</TableCell>
                            <TableCell align="right">Opciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.created_at}</TableCell>
                                <TableCell align="right">
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Button onClick={() => history.push('/provider/edit/1')}>Editar</Button>
                                        <Button>Eliminar</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}

export default Provider;
