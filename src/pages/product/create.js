import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {createProductAction} from "../../redux/productDuck";
import {connect, useDispatch} from "react-redux";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";

const theme = createTheme();

function ProductCreate({product}) {
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataForm = {
            name: data.get('name'),
            description: data.get('description'),
        };
        dispatch(createProductAction(dataForm))
    };

    const history = useHistory()

    useEffect(() => {
        if (!!product)
            history.push('/product')
    }, [product])

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
                            <TextField
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Nombre"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="description"
                                label="Descripcion"
                                name="description"
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
        product: state.product.product,
    }
}

export default connect(mapState)(ProductCreate);
