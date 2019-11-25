import { getGroupSuccess, searchGroupSuccess, getGroups, searchGroup, getImagesForGroup, getImagesForGroupSuccess } from '../store/Actions/index';
import * as actions from '../store/ActionTypes/index';

export const cache = ({ getState, dispatch }) => next => action => {

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
    else if (action.type == actions.GET_GROUPS_CHECK_CACHE) {
        let sessionData = JSON.parse(sessionStorage.getItem(action.payload));
        if (sessionData && sessionData.get) {
            let data = Object.keys(sessionData.get).map(item => sessionData.get[item]);
            dispatch(getGroupSuccess(data, action.payload));
        }
        else {
            dispatch(getGroups(action.payload));
        }
    }
    else if(action.type==actions.GET_IMAGES_FOR_GROUP_CACHE){
        console.log("Inside of the cache");
        console.log(action);
        let localData=JSON.parse(localStorage.getItem(action.payload));
        if(localData){
            dispatch(getImagesForGroupSuccess(localData, action.payload));
        }
        else{
            dispatch(getImagesForGroup(action.payload));
        }
    }
    else{
        next(action);
    }

}
