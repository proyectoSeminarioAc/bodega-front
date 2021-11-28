import {exportHttpClient} from "../utils";

const initialData = {
    fetching: false,
    store: null,
    deleteStatus: false,
    updateStatus: false,
    stores: [],
    error: null
}

const httpClient = exportHttpClient();

const FETCHING_STORE = "FETCHING_STORE";
const FETCHING_STORE_SUCCESS = "FETCHING_STORE_SUCCESS";
const FETCHING_STORE_ERROR = "FETCHING_STORE_ERROR";

const FETCHING_STORES = "FETCHING_STORES";
const FETCHING_STORES_SUCCESS = "FETCHING_STORES_SUCCESS";
const FETCHING_STORES_ERROR = "FETCHING_STORES_ERROR";

const CREATING_STORE = "CREATING_STORE";
const CREATING_STORE_SUCCESS = "CREATING_STORE_SUCCESS";
const CREATING_STORE_ERROR = "CREATING_STORE_ERROR";

const UPDATING_STORE = "UPDATING_STORE";
const UPDATING_STORE_SUCCESS = "UPDATING_STORE_SUCCESS";
const UPDATING_STORE_ERROR = "UPDATING_STORE_ERROR";

const DELETING_STORE = "DELETING_STORE";
const DELETING_STORE_SUCCESS = "DELETING_STORE_SUCCESS";
const DELETING_STORE_ERROR = "DELETING_STORE_ERROR";


export default function storeReducer(action, state = initialData) {
    switch (action.type) {
        case FETCHING_STORE:
        case FETCHING_STORES:
        case CREATING_STORE:
        case UPDATING_STORE:
        case DELETING_STORE:
            return {
                fetching: true,
                store: null,
                deleteStatus: false,
                updateStatus: false,
                stores: [],
                error: null
            }

        case FETCHING_STORE_SUCCESS:
        case CREATING_STORE_SUCCESS:
            return {...state, fetching: false, store: action.payload}

        case UPDATING_STORE_SUCCESS:
            return {...state, fetching: false, store: action.payload, updateStatus: true}

        case DELETING_STORE_SUCCESS:
            return {...state, fetching: false, deleteStatus: action.payload}

        case FETCHING_STORES_SUCCESS:
            return {...state, fetching: false, stores: action.payload}

        case FETCHING_STORE_ERROR:
        case FETCHING_STORES_ERROR:
        case CREATING_STORE_ERROR:
        case UPDATING_STORE_ERROR:
        case DELETING_STORE_ERROR:
            return {...state, fetching: false, error: action.payload}
        default:
            return state;
    }
}

export const getStoresAction = () => (dispatch, getState) => {
    dispatch({
        type: FETCHING_STORES
    });

    httpClient.get('/store/')
        .then(({data}) => {
            dispatch({
                type: FETCHING_STORES_SUCCESS,
                payload: data
            })
        }).catch(err => {
        console.log(err)
        dispatch({
            type: FETCHING_STORES_ERROR,
            payload: err
        })
    })
}

export const createStoreAction = (dataForm) => (dispatch, getState) => {
    dispatch({
        type: CREATING_STORE
    });

    httpClient.post('/store/', dataForm)
        .then(({data}) => {
            dispatch({
                type: CREATING_STORE_SUCCESS,
                payload: data
            })
        }).catch(err => {
        console.log(err)
        dispatch({
            type: CREATING_STORE_ERROR,
            payload: err
        })
    })
}

export const fetchStoreAction = (id) => (dispatch, getState) => {
    dispatch({
        type: FETCHING_STORE
    });

    httpClient.get('/store/' + id)
        .then(({data}) => {
            dispatch({
                type: FETCHING_STORE_SUCCESS,
                payload: data
            })
        }).catch(err => {
        console.log(err)
        dispatch({
            type: FETCHING_STORE_ERROR,
            payload: err
        })
    })
}

export const updateStoreAction = (dataForm, id) => (dispatch, getState) => {
    dispatch({
        type: UPDATING_STORE
    });

    httpClient.put('/store/' + id, dataForm)
        .then(({data}) => {
            dispatch({
                type: UPDATING_STORE_SUCCESS,
                payload: data
            })
        }).catch(err => {

        dispatch({
            type: UPDATING_STORE_ERROR,
            payload: err
        })
    })
}

export const deleteStoreAction = (id) => (dispatch, getState) => {
    dispatch({
        type: DELETING_STORE
    });

    httpClient.delete('/store/' + id)
        .then(({data}) => {
            dispatch({
                type: DELETING_STORE_SUCCESS,
                payload: data
            })
        }).catch(err => {

        dispatch({
            type: DELETING_STORE_ERROR,
            payload: err
        })
    })
}
