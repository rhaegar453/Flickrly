import { getGroupSuccess, searchGroupSuccess, getGroups, searchGroup } from '../store/Actions/index';
import * as actions from '../store/Actions/index';

/* export const cache = ({ getState, dispatch }) => next => action => {
    console.log(action);

    if (action.type == 'SEARCH_GROUPS_CHECK_CACHE' || action.type == 'SEARCH_GROUPS_CHECK_CACHE') {
        let { searchQuery } = getState();
        let sessionData = localStorage.getItem(searchQuery);
        console.log(sessionData);
        if (sessionData) {
            if (action.type == "GET_GROUPS") {
                console.log("Getting search data from cache");
                next(getGroupSuccess(JSON.parse(sessionData)));
                return;
            }
            else {
                console.log("Getting get data from cache");
                next(searchGroupSuccess(JSON.parse(sessionData)));
                return;
            }
        }
        else {
            console.log("Not using the cache");
            next(action);
            return;
        }
    }
    else {
        next(action);
    }
}
 */
export const cache=({getState, dispatch})=>next=>action=>{
    console.log("Arriving here");
    console.log(action.type);
    next(action);

    if(action.type=='SEARCH_GROUPS_CHECK_CACHE'){
        console.log("Checking inside cache");
        let {searchQuery}=getState();
        let sessionData=JSON.parse(sessionStorage.getItem(action.payload));
        if(sessionData&&sessionData.search){
            console.log("Taking from the cache");
            let data=Object.keys(sessionData.search).map(item=>sessionData.search[item]);
            console.log(data);
            dispatch(searchGroupSuccess(data, action.payload));
        }
        else{
            console.log('Not found in cache');
            dispatch(searchGroup(action.payload));
        }
    }
    else{
        next(action);
    }

}
