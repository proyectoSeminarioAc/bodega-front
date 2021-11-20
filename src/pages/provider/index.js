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
import {connect, useDispatch} from "react-redux";
import {useEffect} from "react";
import {deleteProviderAction, getProvidersAction} from "../../redux/providerDuck";
import Skeleton from '@mui/material/Skeleton';

function Provider({providers, deleteStatus, fetching}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const skeletonArray = Array(10).fill('');

    useEffect(() => {
        dispatch(getProvidersAction())
    }, [])

    useEffect(() => {
        if (deleteStatus)
            dispatch(getProvidersAction())
    }, [deleteStatus])

    const handleDelete = (id) => {
        dispatch(deleteProviderAction(id))
    }
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
                        {fetching &&
                        skeletonArray.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    <Skeleton/>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Skeleton/>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Skeleton/>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Skeleton/>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Skeleton/>
                                </TableCell>
                            </TableRow>
                        ))}
                        {providers && providers.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.direction}</TableCell>
                                <TableCell align="right">{row.enrollment_date}</TableCell>
                                <TableCell align="right">
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Button
                                            onClick={() => history.push('/provider/edit/' + row.id)}>Editar</Button>
                                        <Button onClick={() => handleDelete(row.id)}>Eliminar</Button>
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

function mapState(state) {
    return {
        providers: state.provider.providers,
        deleteStatus: state.provider.deleteStatus,
        fetching: state.provider.fetching,
    }
}

export default connect(mapState)(Provider);
