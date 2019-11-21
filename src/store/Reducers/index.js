import * as actions from '../ActionTypes/index';

const initialState={
    message:"Hello World",
    value:0
}


const reducer=(state=initialState, action)=>{
    switch(action.type){
        case actions.HELLO_WORLD:
            return {...state, message:"Hello Boilerplate"};
        case 'INCREMENT':
            return {...state, value:state.value+1}
        case 'DECREMENT':
            return {...state, value:state.value-1};
        default:
            return {...state};
    }
}


export default reducer;