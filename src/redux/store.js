import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import providerReducer from "./providerDuck";
import storeReducer from "./storeDuck";
import productReducer from "./productDuck";
import detailReducer from "./detailtDuck";


const rootReducer = combineReducers({
    provider: providerReducer,
    store: storeReducer,
    product: productReducer,
    detail: detailReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
}
