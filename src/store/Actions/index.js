import * as actions from '../ActionTypes/index';

export const searchGroup=(payload)=>({type:actions.SEARCH_GROUPS, payload:{payload}});
export const searchGroupStart=(data)=>({type:actions.SEARCH_GROUPS_START, payload:data.payload});
export const searchGroupSuccess=(recommendations, searchText)=>({type:actions.SEARCH_GROUPS_SUCCESS,payload:recommendations, text:searchText});
export const searchGroupFailure=(err)=>({type:actions.SEARCH_GROUPS_FAILURE, payload:err});
export const searchGroupCacheCheck=(payload)=>({type:actions.SEARCH_GROUPS_CHECK_CACHE, payload});


export const getGroups=(payload)=>({type:actions.GET_GROUPS, payload:{payload}})
export const getGroupStart=()=>({type:actions.GET_GROUPS_START});
export const getGroupSuccess=(data, searchText)=>({type:actions.GET_GROUPS_SUCCESS, payload:data, text:searchText});
export const getGroupFailure=(err)=>({type:actions.GET_GROUPS_FAILURE, payload:err});
export const getGroupCacheCheck=(payload)=>({type:actions.GET_GROUPS_CHECK_CACHE, payload})

export const getImagesForGroup=(payload)=>({type:actions.GET_IMAGES_FOR_GROUP, payload:payload});
export const getImagesForGroupStart=()=>({type:actions.GET_IMAGES_FOR_GROUP_START});
export const getImagesForGroupSuccess=(data, text)=>({type:actions.GET_IMAGES_FOR_GROUP_SUCCESS, payload:data, text});
export const getImagesForGroupFailure=(err)=>({type:actions.GET_IMAGES_FOR_GROUP_FAILURE});
export const getImagesForGroupCache=(key)=>{
    console.log("Dispatching the cache selection option");
    return {type:actions.GET_IMAGES_FOR_GROUP_CACHE, payload:key}
};

export const selectGroup=(groupDetails)=>({type:actions.SELECT_GROUP, payload:groupDetails});

