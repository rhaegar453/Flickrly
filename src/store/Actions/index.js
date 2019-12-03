import * as actions from '../ActionTypes/index';


/* Get Groups */
let {GET_GROUPS, GET_GROUPS_SUCCESS, GET_GROUPS_FAILURE, GET_GROUPS_GET_CACHE, GET_GROUPS_START, GET_GROUPS_CHECK_CACHE}=actions;

export const getGroups=(data)=>({type:GET_GROUPS, payload:data});
export const getGroupsSuccess=(data)=>({type:GET_GROUPS_SUCCESS, payload:data});
export const getGroupsFailure=(err)=>({type:GET_GROUPS_FAILURE, payload:err});
export const getGroupsGetCache=(data)=>({type:actions.GET_GROUPS_GET_CACHE, payload:data});
export const getGroupsCheckCache=(data)=>({type:GET_GROUPS_CHECK_CACHE, payload:data});
export const getGroupsStart=()=>({type:GET_GROUPS_START});


/* Search Groups */


let {SEARCH_GROUPS,SEARCH_GROUPS_START, SEARCH_GROUPS_SUCCESS, SEARCH_GROUPS_FAILURE, SEARCH_GROUPS_CHECK_CACHE, SEARCH_GROUPS_GET_CACHE}=actions;

export const searchGroups=(data)=>({type:SEARCH_GROUPS, payload:data});
export const searchGroupsSuccess=(data)=>({type:SEARCH_GROUPS_SUCCESS, payload:data});
export const searchGroupFailure=(err)=>({type:SEARCH_GROUPS_FAILURE, payload:err});
export const searchGroupCheckCache=(data)=>({type:SEARCH_GROUPS_CHECK_CACHE, payload:data});
export const searchGroupGetCache=(data)=>({type:SEARCH_GROUPS_GET_CACHE, payload:data});
export const searchGroupsStart=()=>({type:SEARCH_GROUPS_START});

/* Get images for groups */
let {GET_IMAGES_FOR_GROUP, GET_IMAGES_FOR_GROUP_START, GET_IMAGES_FOR_GROUP_SUCCESS, GET_IMAGES_FOR_GROUP_FAILURE, GET_IMAGES_FOR_GROUP_GET_CACHE, GET_IMAGES_FOR_GROUP_CHECK_CACHE}=actions;


export const getImagesForGroup=(data)=>({type:GET_IMAGES_FOR_GROUP, payload:data});
export const getImagesForGroupSuccess=(data)=>({type:GET_IMAGES_FOR_GROUP_SUCCESS, payload:data});
export const getImagesForGroupFailure=(err)=>({type:GET_IMAGES_FOR_GROUP_FAILURE, payload:err});
export const getImagesForGroupCheckCache=(data)=>({type:GET_IMAGES_FOR_GROUP_CHECK_CACHE, payload:data});
export const getImagesForGroupGetCache=(data)=>({type:GET_IMAGES_FOR_GROUP_GET_CACHE, payload:data});
export const getImagesForGroupStart=()=>({type:GET_IMAGES_FOR_GROUP_START});


export const loadMoreGroups=(data)=>({type:actions.LOAD_MORE_GROUPS, payload:data});
export const loadMoreGroupsStart=()=>({type:actions.LOAD_MORE_GROUPS_START});
export const loadMoreGroupsSuccess=(data)=>({type:actions.LOAD_MORE_GROUPS_SUCCESS, payload:data});
export const loadMoreGroupsFailure=(err)=>({type:actions.LOAD_MORE_GROUPS_FAILURE, payload:err});
export const loadMoreGroupsCheckCache=(data)=>({type:actions.LOAD_MORE_GROUPS_CHECK_CACHE, payload:data});
export const loadMoreGroupsGetCache=(data)=>({type:actions.LOAD_MORE_GROUPS_CHECK_CACHE, payload:data});


export const loadMoreImages=(data)=>({type:actions.LOAD_MORE_IMAGES, payload:data});
export const loadMoreImagesStart=()=>({type:actions.LOAD_MORE_IMAGES_START});
export const loadMoreImagesSuccess=(data)=>({type:actions.LOAD_MORE_IMAGES_SUCCESS, payload:data});
export const loadMoreImagesFailure=(err)=>({type:actions.LOAD_MORE_IMAGES_FAILURE, payload:err});
export const loadMoreImagesCheckCache=(data)=>({type:actions.LOAD_MORE_IMAGES_CHECK_CACHE, payload:data});
export const loadMoreImagesGetCache=(data)=>({type:actions.LOAD_MORE_IMAGES_GET_CACHE, payload:data});



let {SELECT_GROUP} =actions;

export const selectGroup=(data)=>({type:SELECT_GROUP, payload:data});


export const makeGroupFavorite=(data)=>({type:actions.MAKE_GROUP_FAVORITE, payload:data});
export const removeGroupFavorite=(data)=>({type:actions.REMOVE_GROUP_FAVORITE, payload:data});
export const makeImageFavorite=(data)=>({type:actions.MAKE_IMAGE_FAVORITE, payload:data});
export const removeImageFavorite=(data)=>({type:actions.REMOVE_IMAGE_FAVORITE, payload:data});


