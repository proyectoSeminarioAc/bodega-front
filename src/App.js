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
import PrimaryAppBar from "./components/appBar";

function App() {
    return (
        <Router>
            <div>
               <PrimaryAppBar/>
                <Switch>
                    <Route path="/providers">
                        <Provider/>
                    </Route>
                <Route path="/product">
                        <Product/>
                    </Route>
                <Route path="/move">
                        <Move/>
                    </Route>
                <Route path="/storage">
                        <Storage/>
                    </Route>
                <Route path="/detail">
                        <Detail/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
