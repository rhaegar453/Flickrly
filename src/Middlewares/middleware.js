import { getGroupSuccess, searchGroupSuccess, getGroups, searchGroup } from '../store/Actions/index';
import * as actions from '../store/ActionTypes/index';

export const cache = ({ getState, dispatch }) => next => action => {
    next(action);

    if (action.type == 'SEARCH_GROUPS_CHECK_CACHE') {
        let { searchQuery } = getState();
        let sessionData = JSON.parse(sessionStorage.getItem(action.payload));
        if (sessionData && sessionData.search) {
            let data = Object.keys(sessionData.search).map(item => sessionData.search[item]);
            dispatch(searchGroupSuccess(data, action.payload));
        }
        else {
            dispatch(searchGroup(action.payload));
        }
    }
    if (action.type == actions.GET_GROUPS_CHECK_CACHE) {
        let sessionData = JSON.parse(sessionStorage.getItem(action.payload));
        if (sessionData && sessionData.get) {
            let data = Object.keys(sessionData.get).map(item => sessionData.get[item]);
            dispatch(getGroupSuccess(data, action.payload));
        }
        else {
            dispatch(getGroups(action.payload));
        }
    }

}
