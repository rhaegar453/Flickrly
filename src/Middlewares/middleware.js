import * as actionCreators from '../store/Actions/index';
import * as actions from '../store/ActionTypes/index';
import db from '../Helpers/Dexie';

export const cache = ({ getState, dispatch }) => next => async action => {
    try {

        if (action.type == actions.SEARCH_GROUPS_CHECK_CACHE) {
            console.log(action);
            let data = await db.search.where('text').equals(action.payload).toArray();
            console.log(data);
            if (data.length > 0) {
                action.cached = true;
                dispatch(actionCreators.searchGroupGetCache({ data, action }));
            }
            else {
                console.log("I am going here");
                dispatch(actionCreators.searchGroups(action.payload));
            }
        }
        else if (action.type == actions.GET_GROUPS_CHECK_CACHE) {
            let data = await db.groups.where('text').equals(action.payload).toArray();
            console.log(data);
            if (data.length > 0) {
                dispatch(actionCreators.getGroupsGetCache(action.payload));
            }
            else {
                dispatch(actionCreators.getGroups(action.payload));
            }
        }
        else if (action.type == actions.GET_IMAGES_FOR_GROUP_CHECK_CACHE) {
            console.log("Inside of the cache");
            console.log(action);
            let localData = JSON.parse(localStorage.getItem(action.payload));
            if (localData) {
                dispatch(actionCreators.getImagesForGroupGetCache({ localData, action }));
            }
            else {
                dispatch(actionCreators.getImagesForGroup(action));
            }
        }
        else {
            next(action);
        }
    }
    catch (err) {
        console.log(err);
    }
}
