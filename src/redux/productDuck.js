import {exportHttpClient} from "../utils";

const initialData = {
    fetching: false,
    product: null,
    deleteStatus: false,
    updateStatus: false,
    products: [],
    error: null
}

const httpClient = exportHttpClient();

const FETCHING_PRODUCT = "FETCHING_PRODUCT";
const FETCHING_PRODUCT_SUCCESS = "FETCHING_PRODUCT_SUCCESS";
const FETCHING_PRODUCT_ERROR = "FETCHING_PRODUCT_ERROR";

const FETCHING_PRODUCTS = "FETCHING_PRODUCTS";
const FETCHING_PRODUCTS_SUCCESS = "FETCHING_PRODUCTS_SUCCESS";
const FETCHING_PRODUCTS_ERROR = "FETCHING_PRODUCTS_ERROR";

const CREATING_PRODUCT = "CREATING_PRODUCT";
const CREATING_PRODUCT_SUCCESS = "CREATING_PRODUCT_SUCCESS";
const CREATING_PRODUCT_ERROR = "CREATING_PRODUCT_ERROR";

const UPDATING_PRODUCT = "UPDATING_PRODUCT";
const UPDATING_PRODUCT_SUCCESS = "UPDATING_PRODUCT_SUCCESS";
const UPDATING_PRODUCT_ERROR = "UPDATING_PRODUCT_ERROR";

const DELETING_PRODUCT = "DELETING_PRODUCT";
const DELETING_PRODUCT_SUCCESS = "DELETING_PRODUCT_SUCCESS";
const DELETING_PRODUCT_ERROR = "DELETING_PRODUCT_ERROR";


export default function productReducer(action, state = initialData) {
    switch (action.type) {
        case FETCHING_PRODUCT:
        case FETCHING_PRODUCTS:
        case CREATING_PRODUCT:
        case UPDATING_PRODUCT:
        case DELETING_PRODUCT:
            return {
                fetching: true,
                product: null,
                deleteStatus: false,
                updateStatus: false,
                products: [],
                error: null
            }

        case FETCHING_PRODUCT_SUCCESS:
        case CREATING_PRODUCT_SUCCESS:
            return {...state, fetching: false, product: action.payload}

        case UPDATING_PRODUCT_SUCCESS:
            return {...state, fetching: false, product: action.payload, updateStatus: true}

        case DELETING_PRODUCT_SUCCESS:
            return {...state, fetching: false, deleteStatus: action.payload}

        case FETCHING_PRODUCTS_SUCCESS:
            return {...state, fetching: false, products: action.payload}

        case FETCHING_PRODUCT_ERROR:
        case FETCHING_PRODUCTS_ERROR:
        case CREATING_PRODUCT_ERROR:
        case UPDATING_PRODUCT_ERROR:
        case DELETING_PRODUCT_ERROR:
            return {...state, fetching: false, error: action.payload}
        default:
            return state;
    }
}

export const getProductsAction = () => (dispatch, getState) => {
    dispatch({
        type: FETCHING_PRODUCTS
    });

    httpClient.get('/product/')
        .then(({data}) => {
            dispatch({
                type: FETCHING_PRODUCTS_SUCCESS,
                payload: data
            })
        }).catch(err => {
        console.log(err)
        dispatch({
            type: FETCHING_PRODUCTS_ERROR,
            payload: err
        })
    })
}

export const createProductAction = (dataForm) => (dispatch, getState) => {
    dispatch({
        type: CREATING_PRODUCT
    });

    httpClient.post('/product/', dataForm)
        .then(({data}) => {
            dispatch({
                type: CREATING_PRODUCT_SUCCESS,
                payload: data
            })
        }).catch(err => {
        console.log(err)
        dispatch({
            type: CREATING_PRODUCT_ERROR,
            payload: err
        })
    })
}

export const fetchProductAction = (id) => (dispatch, getState) => {
    dispatch({
        type: FETCHING_PRODUCT
    });

    httpClient.get('/product/' + id)
        .then(({data}) => {
            dispatch({
                type: FETCHING_PRODUCT_SUCCESS,
                payload: data
            })
        }).catch(err => {
        console.log(err)
        dispatch({
            type: FETCHING_PRODUCT_ERROR,
            payload: err
        })
    })
}

export const updateProductAction = (dataForm, id) => (dispatch, getState) => {
    dispatch({
        type: UPDATING_PRODUCT
    });

    httpClient.put('/product/' + id, dataForm)
        .then(({data}) => {
            dispatch({
                type: UPDATING_PRODUCT_SUCCESS,
                payload: data
            })
        }).catch(err => {

        dispatch({
            type: UPDATING_PRODUCT_ERROR,
            payload: err
        })
    })
}

export const deleteProductAction = (id) => (dispatch, getState) => {
    dispatch({
        type: DELETING_PRODUCT
    });

    httpClient.delete('/product/' + id)
        .then(({data}) => {
            dispatch({
                type: DELETING_PRODUCT_SUCCESS,
                payload: data
            })
        }).catch(err => {

        dispatch({
            type: DELETING_PRODUCT_ERROR,
            payload: err
        })
    })
}
