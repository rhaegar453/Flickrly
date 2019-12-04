import * as actionCreators from '../store/Actions/index';
import * as actions from '../store/ActionTypes/index';
import db from '../Helpers/Dexie';

export const cache = ({ getState, dispatch }) => next => async action => {
    try {

        if (action.type == actions.SEARCH_GROUPS_CHECK_CACHE) {
            let data = await db.search.where('text').equals(action.payload).toArray();
            if (data.length > 0) {
                action.cached = true;
                dispatch(actionCreators.searchGroupGetCache({ data, action }));
            }
            else {
                dispatch(actionCreators.searchGroups(action.payload));
            }
        }
        else if (action.type == actions.GET_GROUPS_CHECK_CACHE) {
            let data = await db.groups.where('text').equals(action.payload).toArray();
            if (data.length > 0) {
                dispatch(actionCreators.getGroupsGetCache(data));
            }
            else {
                dispatch(actionCreators.getGroups(action.payload));
            }
        }
        else if (action.type == actions.GET_IMAGES_FOR_GROUP_CHECK_CACHE) {
            let text=action.payload.toLowerCase();
            let data = await db.images.where('groupid').equals(text).toArray();
            if (data.length > 0) {

                dispatch(actionCreators.getImagesForGroupGetCache(data));
            }
            else {
                dispatch(actionCreators.getImagesForGroup(action.payload));
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
