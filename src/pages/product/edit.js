import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useHistory, useParams} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {fetchProviderAction, updateProviderAction} from "../../redux/providerDuck";
import {fetchProductAction, updateProductAction} from "../../redux/productDuck";

const theme = createTheme();

function ProductEdit({product, updateStatus}) {
    const dispatch = useDispatch()
    const {id} = useParams();
    const [productName, setProductName] = useState()
    const [productDescription, setProductDescription] = useState()

    useEffect(() => {
        dispatch(fetchProductAction(id))
    }, [])


    const history = useHistory()

    useEffect(() => {
        if (!!product) {
            setProductName(product.name)
            setProductDescription(product.description)
            if (updateStatus) {
                history.push('/product')
            }
        }
    }, [product])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataForm = {
            id,
            name: data.get('name'),
            description: data.get('description'),
            alternate_reference: product.alternate_reference
        };
        dispatch(updateProductAction(dataForm, id))
    };

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
                <Typography component="h1" variant="h5">
                    Editando el id {id}
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Nombre"
                                autoFocus
                                value={productName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="description"
                                label="Descripcion"
                                name="description"
                                value={productDescription}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Actuaizar
                    </Button>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
}


function mapState(state) {
    return {
        product: state.product.product,
        updateStatus: state.product.updateStatus,
    }
}

export default connect(mapState)(ProductEdit);
