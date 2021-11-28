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
import {deleteProductAction, getProductsAction} from "../../redux/productDuck";
import SkeletonListComponent from "../../components/SkeletonListComponent";

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Product({products, deleteStatus, fetching}) {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsAction())
    }, [])

    useEffect(() => {
        if (deleteStatus)
            dispatch(getProductsAction())
    }, [deleteStatus])

    const handleDelete = (id) => {
        dispatch(deleteProductAction(id))
    }
    return (
        <>
            <Button onClick={() => history.push('product/create')} variant="contained">Crear</Button>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Descripcion</TableCell>
                            <TableCell align="right">Referencia</TableCell>
                            <TableCell align="right">Opciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <SkeletonListComponent fetching={fetching}/>
                        {products.map(({id, name, description, alternate_reference}) => (
                            <TableRow
                                key={id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {id}
                                </TableCell>
                                <TableCell align="right">{name}</TableCell>
                                <TableCell align="right">{description}</TableCell>
                                <TableCell align="right">{alternate_reference}</TableCell>
                                <TableCell align="right">
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Button
                                            onClick={() => history.push('/product/edit/' + id)}>Editar</Button>
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
        products: state.product.products,
        deleteStatus: state.product.deleteStatus,
        fetching: state.product.fetching,
    }
}

export default connect(mapState)(Product);
