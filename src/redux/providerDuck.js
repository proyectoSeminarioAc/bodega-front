import {exportHttpClient} from "../utils";

const initialData = {
    fetching: false,
    provider: null,
    deleteStatus: false,
    updateStatus: false,
    providers: [],
    error: null
}

const httpClient = exportHttpClient();

const FETCHING_PROVIDER = "FETCHING_PROVIDER";
const FETCHING_PROVIDER_SUCCESS = "FETCHING_PROVIDER_SUCCESS";
const FETCHING_PROVIDER_ERROR = "FETCHING_PROVIDER_ERROR";

const FETCHING_PROVIDERS = "FETCHING_PROVIDERS";
const FETCHING_PROVIDERS_SUCCESS = "FETCHING_PROVIDERS_SUCCESS";
const FETCHING_PROVIDERS_ERROR = "FETCHING_PROVIDERS_ERROR";

const CREATING_PROVIDER = "CREATING_PROVIDER";
const CREATING_PROVIDER_SUCCESS = "CREATING_PROVIDER_SUCCESS";
const CREATING_PROVIDER_ERROR = "CREATING_PROVIDER_ERROR";

const UPDATING_PROVIDER = "UPDATING_PROVIDER";
const UPDATING_PROVIDER_SUCCESS = "UPDATING_PROVIDER_SUCCESS";
const UPDATING_PROVIDER_ERROR = "UPDATING_PROVIDER_ERROR";

const DELETING_PROVIDER = "DELETING_PROVIDER";
const DELETING_PROVIDER_SUCCESS = "DELETING_PROVIDER_SUCCESS";
const DELETING_PROVIDER_ERROR = "DELETING_PROVIDER_ERROR";


export default function providerReducer(state = initialData, action) {
    switch (action.type) {
        case FETCHING_PROVIDER:
        case FETCHING_PROVIDERS:
        case CREATING_PROVIDER:
        case UPDATING_PROVIDER:
        case DELETING_PROVIDER:
            return {
                fetching: true,
                provider: null,
                deleteStatus: false,
                updateStatus: false,
                providers: [],
                error: null
            }

        case FETCHING_PROVIDER_SUCCESS:
        case CREATING_PROVIDER_SUCCESS:
            return {...state, fetching: false, provider: action.payload}

        case UPDATING_PROVIDER_SUCCESS:
            return {...state, fetching: false, provider: action.payload, updateStatus: true}

        case DELETING_PROVIDER_SUCCESS:
            return {...state, fetching: false, deleteStatus: action.payload}

        case FETCHING_PROVIDERS_SUCCESS:
            return {...state, fetching: false, providers: action.payload}

        case FETCHING_PROVIDER_ERROR:
        case FETCHING_PROVIDERS_ERROR:
        case CREATING_PROVIDER_ERROR:
        case UPDATING_PROVIDER_ERROR:
        case DELETING_PROVIDER_ERROR:
            return {...state, fetching: false, error: action.payload}
        default:
            return state;
    }
}

export const getProvidersAction = () => (dispatch, getState) => {
    dispatch({
        type: FETCHING_PROVIDERS
    });

    httpClient.get('/provider/')
        .then(({data}) => {
            dispatch({
                type: FETCHING_PROVIDERS_SUCCESS,
                payload: data
            })
        }).catch(err => {
        console.log(err)
        dispatch({
            type: FETCHING_PROVIDERS_ERROR,
            payload: err
        })
    })
}

export const createProviderAction = (dataForm) => (dispatch, getState) => {
    dispatch({
        type: CREATING_PROVIDER
    });

    httpClient.post('/provider/', dataForm)
        .then(({data}) => {
            dispatch({
                type: CREATING_PROVIDER_SUCCESS,
                payload: data
            })
        }).catch(err => {
        console.log(err)
        dispatch({
            type: CREATING_PROVIDER_ERROR,
            payload: err
        })
    })
}

export const fetchProviderAction = (id) => (dispatch, getState) => {
    dispatch({
        type: FETCHING_PROVIDER
    });

    httpClient.get('/provider/' + id)
        .then(({data}) => {
            dispatch({
                type: FETCHING_PROVIDER_SUCCESS,
                payload: data
            })
        }).catch(err => {
        console.log(err)
        dispatch({
            type: FETCHING_PROVIDER_ERROR,
            payload: err
        })
    })
}

export const updateProviderAction = (dataForm, id) => (dispatch, getState) => {
    dispatch({
        type: UPDATING_PROVIDER
    });

    httpClient.put('/provider/' + id, dataForm)
        .then(({data}) => {
            dispatch({
                type: UPDATING_PROVIDER_SUCCESS,
                payload: data
            })
        }).catch(err => {

        dispatch({
            type: UPDATING_PROVIDER_ERROR,
            payload: err
        })
    })
}

export const deleteProviderAction = (id) => (dispatch, getState) => {
    dispatch({
        type: DELETING_PROVIDER
    });

    httpClient.delete('/provider/' + id)
        .then(({data}) => {
            dispatch({
                type: DELETING_PROVIDER_SUCCESS,
                payload: data
            })
        }).catch(err => {

        dispatch({
            type: DELETING_PROVIDER_ERROR,
            payload: err
        })
    })
}
