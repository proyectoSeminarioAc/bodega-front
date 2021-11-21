import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useHistory, useParams} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {fetchStoreAction, updateStoreAction} from "../../redux/storeDuck";
import {updateProviderAction} from "../../redux/providerDuck";

const theme = createTheme();

function StorageEdit({store, updateStatus}) {
    const dispatch = useDispatch()
    const {id} = useParams();
    const [storageName, setStorageName] = useState()
    const [storageDescription, setStorageDescription] = useState()
    useEffect(() => {
        dispatch(fetchStoreAction(id))
    }, [])

    const history = useHistory()

    useEffect(() => {
        if (!!store) {
            setStorageName(store.name)
            setStorageDescription(store.description)
            if (updateStatus) {
                history.push('/storages')
            }
        }
    }, [store])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const dataForm = {
            id,
            name: data.get('name'),
            description: data.get('description'),
        };
        dispatch(updateStoreAction(dataForm, id))
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
                                value={storageName}
                                onChange={(e) => setStorageName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="description"
                                label="Descripcion"
                                name="description"
                                value={storageDescription}
                                onChange={(e) => setStorageDescription(e.target.value)}
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
        store: state.store.store,
        updateStatus: state.store.updateStatus,
    }
}

export default connect(mapState)(StorageEdit);
