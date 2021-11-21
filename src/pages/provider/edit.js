import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {fetchProviderAction, updateProviderAction} from "../../redux/providerDuck";

const theme = createTheme();

function ProviderEdit({provider, updateStatus}) {
    const dispatch = useDispatch()
    const {id} = useParams();
    const [providerName, setProviderName] = useState()
    const [providerDirection, setProviderDirection] = useState()
    useEffect(() => {
        dispatch(fetchProviderAction(id))
    }, [])

    const history = useHistory()

    useEffect(() => {
        if (!!provider) {
            setProviderName(provider.name)
            setProviderDirection(provider.direction)
            if (updateStatus) {
                history.push('/providers')
            }
        }
    }, [provider])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataForm = {
            name: data.get('name'),
            id: id,
            enrollment_date: provider.enrollment_date,
            direction: data.get('direction')
        };
        dispatch(updateProviderAction(dataForm, id))
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
                                value={providerName}
                                onChange={(e) => setProviderName(e.target.value)}
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={providerDirection}
                                onChange={(e) => setProviderDirection(e.target.value)}
                                required
                                fullWidth
                                id="direction"
                                label="direccion"
                                name="direction"
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
        provider: state.provider.provider,
        updateStatus: state.provider.updateStatus,
    }
}

export default connect(mapState)(ProviderEdit);
