import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {getStoresAction} from "../../redux/storeDuck";
import {getProductsAction} from "../../redux/productDuck";
import {createDetailAction} from "../../redux/detailtDuck";
import {useHistory} from "react-router-dom";

const theme = createTheme();

function DetailCreate({detail, stores, products}) {
    const [productId, setProductId] = useState(0);
    const [storageId, setStorageId] = useState(0);
    const [quantityForm, setQuantityForm] = useState(0);
    const [amountForm, setAmountForm] = useState(0);
    const [amountTotalForm, setAmountTotalForm] = useState(0);

    const handleChangeStorage = (event) => {
        setStorageId(event.target.value);
    };

    const handleChangeProduct = (event) => {
        setProductId(event.target.value);
    };
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStoresAction())
        dispatch(getProductsAction())
    }, [])

    useEffect(() => {
        setAmountTotalForm(quantityForm * amountForm)
    }, [quantityForm, amountForm])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataForm = {
            store_id: storageId,
            product_id: productId,
            amount: data.get('unitValue'),
            quantity: data.get('quantity'),
            amount_total: amountTotalForm,
        }

        dispatch(createDetailAction(dataForm))
    };
    const history = useHistory();

    useEffect(() => {
        if (!!detail)
            history.push('/detail')
    }, [detail])

    return <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="demo-simple-select-label">Bodega</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={storageId}
                                label="Age"
                                onChange={handleChangeStorage}
                            >
                                {
                                    stores.map(({id, name}) => <MenuItem value={id}>{name}</MenuItem>)
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="demo-simple-select-label">Producto</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={productId}
                                label="Age"
                                onChange={handleChangeProduct}
                            >
                                {
                                    products.map(({id, name}) => <MenuItem value={id}>{name}</MenuItem>)
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={quantityForm}
                                onChange={(e) => setQuantityForm(e.target.value)}
                                required
                                fullWidth
                                type="number"
                                id="quantity"
                                label="Cantidad"
                                name="quantity"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={amountForm}
                                onChange={(e) => setAmountForm(e.target.value)}
                                required
                                fullWidth
                                type="number"
                                id="unitValue"
                                label="Valor unitario"
                                name="unitValue"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={amountTotalForm}
                                required
                                fullWidth
                                disabled={true}
                                type="number"
                                id="finalValue"
                                label="Valor final"
                                name="finalValue"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Crear
                    </Button>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
}


function mapState(state) {
    return {
        stores: state.store.stores,
        products: state.product.products,
        detail: state.detail.detail,
    }
}

export default connect(mapState)(DetailCreate);
