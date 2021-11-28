import {exportHttpClient} from "../utils";

const initialData = {
    fetching: false,
    detail: null,
    deleteStatus: false,
    updateStatus: false,
    details: [],
    error: null
}

const httpClient = exportHttpClient();

const FETCHING_DETAIL = "FETCHING_DETAIL";
const FETCHING_DETAIL_SUCCESS = "FETCHING_DETAIL_SUCCESS";
const FETCHING_DETAIL_ERROR = "FETCHING_DETAIL_ERROR";

const FETCHING_DETAILS = "FETCHING_DETAILS";
const FETCHING_DETAILS_SUCCESS = "FETCHING_DETAILS_SUCCESS";
const FETCHING_DETAILS_ERROR = "FETCHING_DETAILS_ERROR";

const CREATING_DETAIL = "CREATING_DETAIL";
const CREATING_DETAIL_SUCCESS = "CREATING_DETAIL_SUCCESS";
const CREATING_DETAIL_ERROR = "CREATING_DETAIL_ERROR";

const UPDATING_DETAIL = "UPDATING_DETAIL";
const UPDATING_DETAIL_SUCCESS = "UPDATING_DETAIL_SUCCESS";
const UPDATING_DETAIL_ERROR = "UPDATING_DETAIL_ERROR";

const DELETING_DETAIL = "DELETING_DETAIL";
const DELETING_DETAIL_SUCCESS = "DELETING_DETAIL_SUCCESS";
const DELETING_DETAIL_ERROR = "DELETING_DETAIL_ERROR";


export default function detailReducer(action, state = initialData) {
    switch (action.type) {
        case FETCHING_DETAIL:
        case FETCHING_DETAILS:
        case CREATING_DETAIL:
        case UPDATING_DETAIL:
        case DELETING_DETAIL:
            return {
                fetching: true,
                detail: null,
                deleteStatus: false,
                updateStatus: false,
                details: [],
                error: null
            }

        case FETCHING_DETAIL_SUCCESS:
        case CREATING_DETAIL_SUCCESS:
            return {...state, fetching: false, detail: action.payload}

        case UPDATING_DETAIL_SUCCESS:
            return {...state, fetching: false, detail: action.payload, updateStatus: true}

        case DELETING_DETAIL_SUCCESS:
            return {...state, fetching: false, deleteStatus: action.payload}

        case FETCHING_DETAILS_SUCCESS:
            return {...state, fetching: false, details: action.payload}

        case FETCHING_DETAIL_ERROR:
        case FETCHING_DETAILS_ERROR:
        case CREATING_DETAIL_ERROR:
        case UPDATING_DETAIL_ERROR:
        case DELETING_DETAIL_ERROR:
            return {...state, fetching: false, error: action.payload}
        default:
            return state;
    }
}

export const getDetailsAction = () => (dispatch, getState) => {
    dispatch({
        type: FETCHING_DETAILS
    });

    httpClient.get('/detail/')
        .then(({data}) => {
            dispatch({
                type: FETCHING_DETAILS_SUCCESS,
                payload: data
            })
        }).catch(err => {
        console.log(err)
        dispatch({
            type: FETCHING_DETAILS_ERROR,
            payload: err
        })
    })
}

export const createDetailAction = (dataForm) => (dispatch, getState) => {
    dispatch({
        type: CREATING_DETAIL
    });

    httpClient.post('/detail/', dataForm)
        .then(({data}) => {
            dispatch({
                type: CREATING_DETAIL_SUCCESS,
                payload: data
            })
        }).catch(err => {
        console.log(err)
        dispatch({
            type: CREATING_DETAIL_ERROR,
            payload: err
        })
    })
}

export const fetchProductAction = (id) => (dispatch, getState) => {
    dispatch({
        type: FETCHING_DETAIL
    });

    httpClient.get('/detail/' + id)
        .then(({data}) => {
            dispatch({
                type: FETCHING_DETAIL_SUCCESS,
                payload: data
            })
        }).catch(err => {
        console.log(err)
        dispatch({
            type: FETCHING_DETAIL_ERROR,
            payload: err
        })
    })
}

export const updateProductAction = (dataForm, id) => (dispatch, getState) => {
    dispatch({
        type: UPDATING_DETAIL
    });

    httpClient.put('/detail/' + id, dataForm)
        .then(({data}) => {
            dispatch({
                type: UPDATING_DETAIL_SUCCESS,
                payload: data
            })
        }).catch(err => {

        dispatch({
            type: UPDATING_DETAIL_ERROR,
            payload: err
        })
    })
}

export const deleteProductAction = (id) => (dispatch, getState) => {
    dispatch({
        type: DELETING_DETAIL
    });

    httpClient.delete('/detail/' + id)
        .then(({data}) => {
            dispatch({
                type: DELETING_DETAIL_SUCCESS,
                payload: data
            })
        }).catch(err => {

        dispatch({
            type: DELETING_DETAIL_ERROR,
            payload: err
        })
    })
}
