import { put, takeEvery, all } from 'redux-saga/effects';
import * as actions from '../ActionTypes/index';
import { getGroupFailure, getGroupStart, getGroupSuccess, searchGroupFailure, searchGroupStart, searchGroupSuccess } from '../Actions/index';
import axios from 'axios';


const createIconURL = ({ nsid, iconserver, iconfarm }) => {
    return `http://farm${iconfarm}.staticflickr.com/${iconserver}/buddyicons/${nsid}.jpg`
}
const createImageURL = async ({ farmid, serverid, id, secret }) => {
    return `https://farm${farmid}.staticflickr.com/${serverid}/${id}_${secret}.jpg`
}


function* getGroups(action) {
    try {
        yield put(getGroupStart());
        console.log(action);
        let groupsURL = `https://www.flickr.com/services/rest/?method=flickr.groups.search&api_key=2f3d9d105879101fe5df7e5c9718a1ad&text=${action.payload.payload}&per_page=10&format=json&nojsoncallback=1`;
        let data = yield axios.get(groupsURL);
        let dataWithImages = yield all(
            data.data.groups.group.map(async item => {
                let getPhotosUrl = `https://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=2f3d9d105879101fe5df7e5c9718a1ad&group_id=${item.nsid}&per_page=8&format=json&nojsoncallback=1`;
                let photoData = await axios.get(getPhotosUrl);
                let modified=await photoData.data.photos.photo.map(item=>createImageURL({farmid:item.farm, serverid:item.server, id:item.id, secret:item.secret}));
                let myData=await Promise.all(modified);
                return { ...item,  photos:myData };
            })
        );
        console.log(dataWithImages);
        let resolvedData = yield Promise.all(dataWithImages);
        yield put(getGroupSuccess(resolvedData));
    }
    catch (err) {
        yield put(getGroupFailure(err));
    }
}
function* searchGroups(action) {
    try {
        yield put(searchGroupStart());
        console.log(action);
        let getGroupsUrl = `https://www.flickr.com/services/rest/?method=flickr.groups.search&api_key=2f3d9d105879101fe5df7e5c9718a1ad&text=${action.payload.payload}&per_page=6&format=json&nojsoncallback=1`;
        let data = yield axios.get(getGroupsUrl);
        let recommendations = data.data.groups.group.map(item => {
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



