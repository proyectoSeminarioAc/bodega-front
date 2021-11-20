const initialData = {
    fetching: false,
    provider: null,
    providers: [],
    error: null
}

const FETCHING_PROVIDER = "FETCHING_PROVIDER";
const FETCHING_PROVIDER_SUCCESS = "FETCHING_PROVIDER_SUCCESS";
const FETCHING_PROVIDER_ERROR = "FETCHING_PROVIDER_ERROR";

const FETCHING_PROVIDERS = "FETCHING_PROVIDERS";
const FETCHING_PROVIDERS_SUCCESS = "FETCHING_PROVIDERS_SUCCESS";
const FETCHING_PROVIDERS_ERROR = "FETCHING_PROVIDERS_ERROR";


export default function providerReducer(state = initialData, action) {
    switch (action.type) {
        case FETCHING_PROVIDER:
        case FETCHING_PROVIDERS:
            return {
                fetching: false,
                provider: null,
                providers: [],
                error: null
            }

        case FETCHING_PROVIDER_SUCCESS:
            return {...state, fetching: false, provider: action.payload}

        case FETCHING_PROVIDERS_SUCCESS:
            return {...state, fetching: false, providers: action.payload}

        case FETCHING_PROVIDER_ERROR:
        case FETCHING_PROVIDERS_ERROR:
            return {...state, fetching: false, error: action.payload}
        default:
            return state;
    }
}
