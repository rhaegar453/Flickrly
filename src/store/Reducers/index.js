import * as actions from '../ActionTypes/index';

const initialState = {
    searchQuery: '',
    groupSearchQuery: '',
    groupRecommendations: [],
    groups: [],
    error: null,
    selectedGroup: null,
    selectedGroupImages: null,
    loading: false,
    selectedGroupWithInfo: null
}

const addToSessionStorage = (action, key, value) => {
    if (key == undefined) {
        return;
    }

    let data = JSON.parse(sessionStorage.getItem(key));
    if (action == 'search') {
        if (data == null) {
            let searchData = JSON.parse(value);
            sessionStorage.setItem(key, JSON.stringify({ search: searchData }));
            return;
        }
        if (data.get) {
            let newData = {};
            let searchData = JSON.parse(value);
            newData.get = data.get;
            newData.search = searchData;
            sessionStorage.setItem(key, JSON.stringify(newData));
            return;
        }
    }
    else {
        if (data == null) {
            let searchData = JSON.parse(value);
            sessionStorage.setItem(key, JSON.stringify({ search: searchData }));
            return;
        }
        if (data.search) {
            let newData = {};
            let getData = JSON.parse(value);
            newData.search = data.search;
            newData.get = getData;
            sessionStorage.setItem(key, JSON.stringify(newData));
            return;
        }
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SEARCH_GROUPS_START:
            return { ...state, loading: true, searchQuery: action.payload }
        case actions.SEARCH_GROUPS_SUCCESS:
            if (action.text) {
                /*sessionStorage.setItem(action.text, JSON.stringify({ search: { ...action.payload } })); */
                addToSessionStorage('search', action.text, JSON.stringify(action.payload));
            }
            let data = JSON.parse(sessionStorage.getItem(action.text));
            return { ...state, loading: false, groupRecommendations: action.payload, searchQuery: action.text };
        case actions.SEARCH_GROUPS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case actions.GET_GROUPS_START:
            return { ...state, loading: true }
        case actions.GET_GROUPS_SUCCESS:
            if (action.text) {
                /*sessionStorage.setItem(action.text, JSON.stringify({ get: { ...action.payload } })); */
                addToSessionStorage('get', action.text.payload, JSON.stringify(action.payload));
            }
            return { ...state, loading: false, groups: action.payload }
        case actions.GET_GROUPS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case actions.SELECT_GROUP:
            return { ...state, selectedGroup: action.payload }
        case actions.GET_IMAGES_FOR_GROUP_START:
            return { ...state, loading: true }
        case actions.GET_IMAGES_FOR_GROUP_SUCCESS:
            localStorage.setItem(action.text, JSON.stringify(action.payload));
            return { ...state, selectedGroupImages: action.payload, loading: false }
        default:
            return { ...state };
    }
}


export default reducer;