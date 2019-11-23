import * as actions from '../ActionTypes/index';

export const searchGroup=(payload)=>({type:actions.SEARCH_GROUPS, payload:{payload}});
export const searchGroupStart=()=>({type:actions.SEARCH_GROUPS_START});
export const searchGroupSuccess=(recommendations)=>({type:actions.SEARCH_GROUPS_SUCCESS,payload:recommendations});
export const searchGroupFailure=(err)=>({type:actions.SEARCH_GROUPS_FAILURE, payload:err});


export const getGroups=(payload)=>({type:actions.GET_GROUPS, payload:{payload}})
export const getGroupStart=()=>({type:actions.GET_GROUPS_START});
export const getGroupSuccess=(data)=>({type:actions.GET_GROUPS_SUCCESS, payload:data});
export const getGroupFailure=(err)=>({type:actions.GET_GROUPS_FAILURE, payload:err});


export const selectGroup=(groupDetails)=>({type:actions.SELECT_GROUP, payload:groupDetails});

