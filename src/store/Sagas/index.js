import {put,takeEvery, all} from 'redux-saga/effects';
import * as actions from '../ActionTypes/index';
import {decrementValue, incrementValue, increment, decrement} from '../Actions/index';

const delay=(ms)=>new Promise((res)=>setTimeout(res, ms));



function* helloSaga(){
    console.log("Hello World this is the boilerplate");
}

function* incrementAsync(){
    console.log("Incrementing the value");
    yield delay(1000);
    yield(put(increment()));
}
function* decrementAsync(){
    console.log("Decrementing the value");
    yield delay(1000);
    yield(put(decrement()));
}

function* watchActions(){
    yield takeEvery(actions.HELLO_WORLD, helloSaga);
    yield takeEvery(actions.INCREMENT_VALUE,incrementAsync);
    yield takeEvery(actions.DECREMENT_VALUE, decrementAsync);
}

export default function* rootSaga(){
    yield all([
        helloSaga(),
        watchActions()
    ])
}


    
