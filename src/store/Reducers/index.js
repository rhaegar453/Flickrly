import * as actions from '../ActionTypes/index';

const initialState={
    searchQuery:'',
    groupSearchQuery:'',
    groupRecommendations:[], 
    groups:[], 
    error:null, 
    selectedGroup:null, 
    selectedGroupImages:null, 
    loading:false,
    selectedGroupWithInfo:null
}


const reducer=(state=initialState, action)=>{
    switch(action.type){
        case actions.SEARCH_GROUPS_START:
            return {...state, loading:true, searchQuery:action.payload}
        case actions.SEARCH_GROUPS_SUCCESS:
            localStorage.setItem(state.searchQuery, JSON.stringify({search:{...action.payload}}));
            return {...state, loading:false, groupRecommendations:action.payload};
        case actions.SEARCH_GROUPS_FAILURE:
            return {...state, loading:false, error:action.payload}
        case actions.GET_GROUPS_START:
            return {...state, loading:true}
        case actions.GET_GROUPS_SUCCESS:
            localStorage.setItem(state.searchQuery, JSON.stringify({get:{...action.payload}}));
            return {...state, loading:false, groups:action.payload}
        case actions.GET_GROUPS_FAILURE:
            return {...state, loading:false, error:action.payload }
        case actions.SELECT_GROUP:
            return {...state, selectedGroup:action.payload}
        case actions.GET_IMAGES_FOR_GROUP_START:
            return {...state, loading:true}
        case actions.GET_IMAGES_FOR_GROUP_SUCCESS:
            return {...state,selectedGroupImages:action.payload, loading:false}
        default:
            return {...state};
    }
}


export default reducer;