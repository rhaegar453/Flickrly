import * as actions from '../ActionTypes/index';

const initialState={
    searchQuery:'',
    groupSearchQuery:'',
    groupRecommendations:[], 
    groups:[], 
    error:null, 
    loading:false
}


const reducer=(state=initialState, action)=>{
    switch(action.type){
        case actions.SEARCH_GROUPS_START:
            return {...state, loading:true}
        case actions.SEARCH_GROUPS_SUCCESS:
            return {...state, loading:false, groupRecommendations:action.payload};
        case actions.SEARCH_GROUPS_FAILURE:
            return {...state, loading:false, error:action.payload}
        case actions.GET_GROUPS_START:
            return {...state, loading:true}
        case actions.GET_GROUPS_SUCCESS:
            return {...state, loading:false, groups:action.payload}
        case actions.GET_GROUPS_FAILURE:
            return {...state, loading:false, error:action.payload }
        default:
            return {...state};
    }
}


export default reducer;