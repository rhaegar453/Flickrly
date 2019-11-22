import { put, takeEvery, all } from 'redux-saga/effects';
import * as actions from '../ActionTypes/index';
import { getGroupFailure, getGroupStart, getGroupSuccess, searchGroupFailure, searchGroupStart, searchGroupSuccess } from '../Actions/index';
import axios from 'axios';




function* getGroups(action) {
    try {
        yield put(getGroupStart());
        yield put(getGroupSuccess(action));
    }
    catch (err) {
        yield put(getGroupFailure(err));
    }
}
function* searchGroups(action) {
    try {
        yield put(searchGroupStart());
        let getGroupsUrl = `https://www.flickr.com/services/rest/?method=flickr.groups.search&api_key=2f3d9d105879101fe5df7e5c9718a1ad&text=${action.payload}&per_page=6&format=json&nojsoncallback=1`;
        let data = yield axios.get(getGroupsUrl);
        let recommendations=data.data.groups.group.map(item => {
            return { name: item.name, nsid: item.nsid, iconserver: item.iconserver, iconfarm: item.iconfarm }
        });
        yield put(searchGroupSuccess(recommendations));
    }
    catch (err) {
        yield put(searchGroupFailure(err));
    }
}

function* watchActions() {
    yield takeEvery(actions.GET_GROUPS, getGroups);
    yield takeEvery(actions.SEARCH_GROUPS, searchGroups);
}

export default function* rootSaga() {
    yield all([
        watchActions()
    ])
}



