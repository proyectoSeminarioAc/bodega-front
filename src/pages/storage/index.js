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
import SkeletonListComponent from "../../components/SkeletonListComponent";
import {useEffect} from "react";
import {deleteStoreAction, getStoresAction} from "../../redux/storeDuck";

function Storage({stores, deleteStatus, fetching}) {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStoresAction())
    }, [])

    useEffect(() => {
        if (deleteStatus)
            dispatch(getStoresAction())
    }, [deleteStatus])

    const handleDelete = (id) => {
        dispatch(deleteStoreAction(id))
    }

    return (
        <>
            <Button onClick={() => history.push('/storage/create')} variant="contained">Crear</Button>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>code</TableCell>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Descripcion</TableCell>
                            <TableCell align="right">Opciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <SkeletonListComponent fetching={fetching}/>
                        {stores && stores.map(({id, name, description}) => (
                            <TableRow
                                key={id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {id}
                                </TableCell>
                                <TableCell align="right">{name}</TableCell>
                                <TableCell align="right">{description}</TableCell>
                                <TableCell align="right">
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Button
                                            onClick={() => history.push('/storage/edit/' + id)}>Editar</Button>
                                        <Button onClick={() => handleDelete(id)}>Eliminar</Button>
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
        stores: state.store.stores,
        deleteStatus: state.store.deleteStatus,
        fetching: state.store.fetching,
    }
}

export default connect(mapState)(Storage);
