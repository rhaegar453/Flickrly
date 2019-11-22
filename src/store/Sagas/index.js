import {put,takeEvery, all} from 'redux-saga/effects';
import * as actions from '../ActionTypes/index';
import {getGroupFailure, getGroupStart, getGroupSuccess, searchGroupFailure, searchGroupStart, searchGroupSuccess} from '../Actions/index';
import axios from 'axios';




function* getGroups(action){
    try{
        yield put(getGroupSuccess(action));
    }
    catch(err){
        yield put(getGroupFailure(err));
    }
}
function* searchGroups(action){
    try{
        yield put(searchGroupSuccess(action));
    }
    catch(err){
        yield put(searchGroupFailure(err));
    }
}

function* watchActions(){
    yield takeEvery(actions.GET_GROUPS, getGroups);
    yield takeEvery(actions.SEARCH_GROUPS,searchGroups);
}

export default function* rootSaga(){
    yield all([
        watchActions()
    ])
}


    
