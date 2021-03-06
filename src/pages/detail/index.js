import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useHistory} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {useEffect} from "react";
import SkeletonListComponent from "../../components/SkeletonListComponent";
import {getDetailsAction} from "../../redux/detailtDuck";

function Detail({details, deleteStatus, fetching}) {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetailsAction())
    }, [])

    useEffect(() => {
        if (deleteStatus)
            dispatch(getDetailsAction())
    }, [deleteStatus])

    return (
        <>
            <Button onClick={() => history.push('detail/create')} variant="contained">Crear</Button>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell align="right">Bodega</TableCell>
                            <TableCell align="right">Cantidad</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right">Valor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <SkeletonListComponent fetching={fetching}/>

                        {details && details.map(({id, product_id, store_id, quantity, amount, amount_total}) => (
                            <TableRow
                                key={id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {product_id}
                                </TableCell>
                                <TableCell align="right">{store_id}</TableCell>
                                <TableCell align="right">{quantity}</TableCell>
                                <TableCell align="right">{amount}</TableCell>
                                <TableCell align="right">{amount_total}</TableCell>
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
        details: state.detail.details,
        deleteStatus: state.detail.deleteStatus,
        fetching: state.detail.fetching,
    }
}

export default connect(mapState)(Detail);
