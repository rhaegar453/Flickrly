import { put, takeEvery, all, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../ActionTypes/index';
import * as actionCreators from '../Actions/index';
import db from '../../Helpers/Dexie';

import axios from 'axios';


const createIconURL = ({ nsid, iconserver, iconfarm }) => {
    return `http://farm${iconfarm}.staticflickr.com/${iconserver}/buddyicons/${nsid}.jpg`
}
const createImageURL = ({ farmid, serverid, id, secret }) => {
    return `https://farm${farmid}.staticflickr.com/${serverid}/${id}_${secret}.jpg`
}

const createImageURLMedium = ({ farmid, serverid, id, secret }) => {
    return `https://farm${farmid}.staticflickr.com/${serverid}/${id}_${secret}_m.jpg`
}


function* getGroups(action) {
    try {
        yield put(actionCreators.getGroupsStart());
        let groupsURL = `https://www.flickr.com/services/rest/?method=flickr.groups.search&api_key=2f3d9d105879101fe5df7e5c9718a1ad&text=${action.payload}&per_page=10&format=json&nojsoncallback=1`;
        let data = yield axios.get(groupsURL);
        let dataWithImages = yield all(
            data.data.groups.group.map(async item => {
                let getPhotosUrl = `https://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=2f3d9d105879101fe5df7e5c9718a1ad&group_id=${item.nsid}&per_page=8&format=json&nojsoncallback=1`;
                let photoData = await axios.get(getPhotosUrl);
                if (photoData.data.code == 2) {
                    return;
                }
                if (photoData.data.photos.photo.length == 0) {
                    return { ...item, photos: [], total: 0 };
                }
                else {
                    let modified = await photoData.data.photos.photo.map(async item => {
                        return { url: createImageURL({ farmid: item.farm, serverid: item.server, id: item.id, secret: item.secret }), id: item.id };
                    });
                    let myData = await Promise.all(modified);
                    let myDataMod = myData.filter(item => item);
                    return { ...item, photos: myDataMod, total: photoData.data.photos.total };
                }
            })
        );

        let resolvedData = yield Promise.all(dataWithImages);
        let mod = resolvedData.filter(item => item);
        yield put(actionCreators.getGroupsSuccess({ data: mod, text: action.payload }));
    }
    catch (err) {
        yield put(actionCreators.getGroupsFailure(err));
    }
}
function* searchGroups(action) {
    try {
        yield put(actionCreators.searchGroupsStart());
        let getGroupsUrl = `https://www.flickr.com/services/rest/?method=flickr.groups.search&api_key=2f3d9d105879101fe5df7e5c9718a1ad&text=${action.payload}&per_page=6&format=json&nojsoncallback=1`;
        let data = yield axios.get(getGroupsUrl);
        let recommendations = data.data.groups.group.map(item => {
            return { name: item.name, nsid: item.nsid, iconserver: item.iconserver, iconfarm: item.iconfarm }
        });
        yield put(actionCreators.searchGroupsSuccess({ recommendations, text: action.payload }));
    }
    catch (err) {
        yield put(actionCreators.searchGroupFailure(err));
    }
}

function* getImagesForGroup(action) {
    try {
        yield put(actionCreators.getImagesForGroupStart());
        let groupData = yield select((state) => state.selectedGroup);
        let modified = yield all(groupData.photos.map(async item => {
            let photoInfoUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=2f3d9d105879101fe5df7e5c9718a1ad&photo_id=${item.id}&format=json&nojsoncallback=1`;
            let data = await axios.get(photoInfoUrl);
            console.log("Checking for isfavorite");
            console.log(data);
            return { photoid: item.id, title: data.data.photo.title._content, description: data.data.photo.description._content, likes: parseInt(data.data.photo.isfavorite), url: createImageURL({ farmid: data.data.photo.farm, id: item.id, serverid: data.data.photo.server, secret: data.data.photo.secret }), comments: data.data.photo.comments._content, owner: data.data.photo.owner.username, views: data.data.photo.views, date: data.data.photo.dateuploaded };
        }));
        yield put(actionCreators.getImagesForGroupSuccess({ data: modified, text: action.payload }));
    }
    catch (err) {
        yield put(actionCreators.getImagesForGroupFailure());
    }
}


function* loadMoreGroups(action) {
    try {
        yield put(actionCreators.loadMoreGroupsStart());
        let groupLoadMoreUrl = `https://www.flickr.com/services/rest/?method=flickr.groups.search&api_key=2f3d9d105879101fe5df7e5c9718a1ad&text=${action.payload.searchQuery}&per_page=10&page=${action.payload.data}&format=json&nojsoncallback=1`;
        let data = yield axios.get(groupLoadMoreUrl);
        let dataWithImages = yield all(
            data.data.groups.group.map(async item => {
                let getPhotosUrl = `https://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=2f3d9d105879101fe5df7e5c9718a1ad&group_id=${item.nsid}&per_page=8&format=json&nojsoncallback=1`;
                var photoData = await axios.get(getPhotosUrl);
                if (photoData.data.code == 2) {
                    return;
                }
                if (photoData.data.photos.photo.length == 0) {
                    return { ...item, photos: [], total: 0 };
                }
                else {
                    let modified = await photoData.data.photos.photo.map(async item => {
                        return { url: createImageURL({ farmid: item.farm, serverid: item.server, id: item.id, secret: item.secret }), id: item.id };
                    });
                    let myData = await Promise.all(modified);
                    return { ...item, photos: myData, total: photoData.data.photos.total };
                }
            })
        );

        let resolvedData = yield Promise.all(dataWithImages);
        resolvedData=resolvedData.filter(item=>item);
        yield put(actionCreators.loadMoreGroupsSuccess({ data: resolvedData, text: action.payload.searchQuery, page: action.payload.data }));
    }
    catch (err) {
        yield put(actionCreators.loadMoreGroupsFailure(err));
    }
}

function* loadMoreImages(action) {
    try {
        console.log(action);
        yield put(actionCreators.loadMoreImagesStart());
        let loadMoreUrl = `https://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=2f3d9d105879101fe5df7e5c9718a1ad&group_id=${action.payload.nsid}&per_page=10&page=${action.payload.page}&format=json&nojsoncallback=1`;
        let data = yield axios.get(loadMoreUrl);
        if (data.data.photos.photo.length == 0) {
            return;
        }
        let modified = yield all(data.data.photos.photo.map(async item => {
            let photoInfoUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=2f3d9d105879101fe5df7e5c9718a1ad&photo_id=${item.id}&format=json&nojsoncallback=1`;
            let data = await axios.get(photoInfoUrl);
            return { photoid: data.data.photo.id,title: data.data.photo.title._content, description: data.data.photo.description._content, likes: parseInt(data.data.photo.isfavorite), url: createImageURL({ farmid: data.data.photo.farm, id: item.id, serverid: data.data.photo.server, secret: data.data.photo.secret }), comments: data.data.photo.comments._content, owner: data.data.photo.owner.username, views: data.data.photo.views, date: data.data.photo.dateuploaded };
        }));
        yield put(actionCreators.loadMoreImagesSuccess({ photos: modified, nsid: action.payload }));
    }
    catch (err) {
        yield put(actionCreators.loadMoreImagesFailure(err));
    }
}

function* watchActions() {
    yield takeEvery(actions.GET_GROUPS, getGroups);
    yield takeEvery(actions.SEARCH_GROUPS, searchGroups);
    yield takeEvery(actions.GET_IMAGES_FOR_GROUP, getImagesForGroup)
    yield takeLatest(actions.LOAD_MORE_GROUPS, loadMoreGroups);
    yield takeLatest(actions.LOAD_MORE_IMAGES, loadMoreImages)
}







export default function* rootSaga() {
    yield all([
        watchActions()
    ])
}



