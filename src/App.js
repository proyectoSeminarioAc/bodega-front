import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import Provider from "./pages/provider";
import Storage from "./pages/storage";
import Detail from "./pages/detail";
import Product from "./pages/product";
import Move from "./pages/move";
import PrimaryAppBar from "./components/PrimaryAppBar";
import {Box, Grid} from "@mui/material";
import ProductCreate from "./pages/product/create";
import ProductEdit from "./pages/product/edit";
import ProviderCreate from "./pages/provider/create";
import ProviderEdit from "./pages/provider/edit";
import StorageCreate from "./pages/storage/create";
import StorageEdit from "./pages/storage/edit";
import DetailCreate from "./pages/detail/create";
import DetailEdit from "./pages/detail/DetailEdit";

function App() {
    return (
        <Router>
            <div>
                <PrimaryAppBar/>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={12}>
                            <Switch>
                                <Route exact path="/providers">
                                    <Provider/>
                                </Route>
                                <Route exact path="/provider/create">
                                    <ProviderCreate/>
                                </Route>
                                <Route exact path="/provider/edit/:id">
                                    <ProviderEdit/>
                                </Route>
                                <Route exact path="/product">
                                    <Product/>
                                </Route>
                                <Route exact path="/product/create">
                                    <ProductCreate/>
                                </Route>
                                <Route exact path="/product/edit/:id">
                                    <ProductEdit/>
                                </Route>
                                <Route exact path="/move">
                                    <Move/>
                                </Route>
                                <Route path="/storages">
                                    <Storage/>
                                </Route>
                                <Route exact path="/storage/create">
                                    <StorageCreate/>
                                </Route>
                                <Route exact path="/storage/edit/:id">
                                    <StorageEdit/>
                                </Route>
                                <Route exact path="/detail">
                                    <Detail/>
                                </Route>
                                <Route exact path="/detail/create">
                                    <DetailCreate/>
                                </Route>
                                <Route exact path="/detail/edit/:id">
                                    <DetailEdit/>
                                </Route>
                            </Switch>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </Router>
    );
}

export default App;
