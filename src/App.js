import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
} from "react-router-dom";

import Provider from "./pages/provider";
import Storage from "./pages/storage";
import Detail from "./pages/detail";
import Product from "./pages/product";
import Move from "./pages/move";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/providers">Proveedores</Link>
                        </li>
                        <li>
                            <Link to="/product">Producto</Link>
                        </li>
                        <li>
                            <Link to="/move">Movimiento</Link>
                        </li>
                        <li>
                            <Link to="/storage">Bodega</Link>
                        </li>
                        <li>
                            <Link to="/detail">Detalle</Link>
                        </li>
                    </ul>
                </nav>

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
