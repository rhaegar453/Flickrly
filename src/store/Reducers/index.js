import * as actions from '../ActionTypes/index';
import { uniqBy } from 'lodash';
import db from '../../Helpers/Dexie';

const initialState = {
    searchQuery: '',
    groupSearchQuery: '',
    groupRecommendations: [],
    groups: [],
    error: null,
    selectedGroup: null,
    selectedGroupImages: null,
    loading: false,
    selectedGroupWithInfo: null,
    currentPage: 1,
    scrolling: false
}

const persistInLocalStorage = (arr, key) => {
    let localData = JSON.parse(localStorage.getItem(key));
    let totalData = [...arr, ...localData];
    let newData = uniqBy(totalData, (e) => e.url);
    console.log(newData);
    localStorage.setItem(key, JSON.stringify(newData));
}



const persistInDB = (payload, text, action) => {
    try {
        text = text.toLowerCase();
        if (action == 'groups') {
            payload.map(item => {
                let iconUrl = `http://farm${item.iconfarm}.staticflickr.com/${item.iconserver}/buddyicons/${item.nsid}.jpg`;
                db.groups.put({ groupid: item.nsid, icon: iconUrl, name: item.name, photos: item.photos, members: item.members, text: text, isFavorite: 0 });
            })
        }
        else if (action == 'search') {
            payload.map(item => {
                let iconUrl = `http://farm${item.iconfarm}.staticflickr.com/${item.iconserver}/buddyicons/${item.nsid}.jpg`;
                db.search.put({ groupid: item.nsid, icon: iconUrl, name: item.name, text: text })
            })
        }
        else if (action == 'images') {
            payload.map(item => {
                db.images.put({ groupid: text, ...item, isFavorite: 0 });
            })
        }
        else if (action == 'loadmoregroups') {
            payload.map(item => {
                let iconUrl = `http://farm${item.iconfarm}.staticflickr.com/${item.iconserver}/buddyicons/${item.nsid}.jpg`;
                db.groups.put({ groupid: item.nsid, icon: iconUrl, name: item.name, photos: item.photos, members: item.members, text: text, isFavorite: 0 });
            })
        }
        else if (action = 'loadmoreimages') {
            payload.map(item => {
                db.images.put({ groupid: text, ...item, isFavorite: 0 });
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}


const persistFavorite = (data, value, action) => {
    if (action == 'togglegroupfavorite') {
        console.log('Persisting Group Favorite');
        db.groups.update(data, { isFavorite: value });
    }
    else if (action = 'toggleimagesfavorite') {
        db.images.update(data, { isFavorite: value });
    }
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SEARCH_GROUPS_START:
            return { ...state, loading: true, searchQuery: action.payload }
        case actions.SEARCH_GROUPS_SUCCESS:
            if (action.payload.text.length > 0) {
                persistInDB(action.payload.recommendations, action.payload.text, 'search');
            }
            let data = action.payload.recommendations.map(item => {
                let iconUrl = `http://farm${item.iconfarm}.staticflickr.com/${item.iconserver}/buddyicons/${item.nsid}.jpg`;
                return { groupid: item.nsid, icon: iconUrl, name: item.name, text: action.payload.text };
            })
            return { ...state, loading: false, groupRecommendations: data, searchQuery: action.payload.text };
        case actions.SEARCH_GROUPS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case actions.SEARCH_GROUPS_GET_CACHE:
            return { ...state, loading: false, groupRecommendations: action.payload.data, searchQuery: action.payload.action.payload }
        case actions.GET_GROUPS_START:
            return { ...state, loading: true }
        case actions.GET_GROUPS_SUCCESS:
            if (action.payload.text.length > 0) {
                persistInDB(action.payload.data, action.payload.text, 'groups');
            }
            let groups = action.payload.data.map(item => {
                let iconUrl = `http://farm${item.iconfarm}.staticflickr.com/${item.iconserver}/buddyicons/${item.nsid}.jpg`;
                return { groupid: item.nsid, icon: iconUrl, name: item.name, photos: item.photos, members: item.members, text: action.payload.text, isFavorite: 0 };
            });
            return { ...state, loading: false, groups: groups }
        case actions.GET_GROUPS_GET_CACHE:
            return { ...state, loading: false, groups: action.payload }
        case actions.GET_GROUPS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case actions.SELECT_GROUP:
            return { ...state, selectedGroup: action.payload }
        case actions.GET_IMAGES_FOR_GROUP_START:
            return { ...state, loading: true }
        case actions.GET_IMAGES_FOR_GROUP_SUCCESS:
            if (action.payload.text.length > 0) {
                persistInDB(action.payload.data, action.payload.text, "images");
            }
            return { ...state, selectedGroupImages: action.payload.data, loading: false }

        case actions.GET_IMAGES_FOR_GROUP_GET_CACHE:
            return { ...state, selectedGroupImages: action.payload };
        case actions.LOAD_MORE_GROUPS_SUCCESS:
            if (action.payload.text.length > 0) {
                persistInDB(action.payload.data, action.payload.text, 'loadmoregroups');
            }
            let groupsLoaded = action.payload.data.map(item => {
                let iconUrl = `http://farm${item.iconfarm}.staticflickr.com/${item.iconserver}/buddyicons/${item.nsid}.jpg`;
                return { groupid: item.nsid, icon: iconUrl, name: item.name, photos: item.photos, members: item.members, text: action.payload.text, isFavorite: 0 };
            });
            return { ...state, currentPage: action.payload.page, groups: [...state.groups, ...groupsLoaded], scrolling: false };
        case actions.LOAD_MORE_GROUPS_START:
            return { ...state, scrolling: true };
        case actions.LOAD_MORE_IMAGES_START:
            return { ...state, scrolling: true };
        case actions.LOAD_MORE_IMAGES_SUCCESS:
            if (action.payload.photos.length > 0) {
                persistInDB(action.payload.photos, action.payload.nsid.nsid, 'loadmoreimages')
            }
            return { ...state, scrolling: false, selectedGroupImages: [...state.selectedGroupImages, ...action.payload.photos] };

        case actions.MAKE_GROUP_FAVORITE:
            persistFavorite(action.payload, 1, 'togglegroupfavorite');
            return {
                ...state, groups: state.groups.map(item => {
                    if (item.groupid == action.payload) {
                        return { ...item, isFavorite: 1 }
                    }
                    else return item;
                })
            }
        case actions.REMOVE_GROUP_FAVORITE:
            persistFavorite(action.payload, 0, 'togglegroupfavorite');
            return {
                ...state, groups: state.groups.map(item => {
                    if (item.groupid == action.payload) {
                        return { ...item, isFavorite: 0 }
                    }
                    else return item;
                })
            }
        case actions.MAKE_IMAGE_FAVORITE:
            console.log(action);
            persistFavorite(action.payload, 1, 'toggleimagesfavorite');
            return {
                ...state, selectedGroupImages: state.selectedGroupImages.map(item => {
                    if (item.photoid == action.payload) {
                        return { ...item, isFavorite: 1 }
                    }
                    else {
                        return item;
                    }
                })
            }
        case actions.REMOVE_IMAGE_FAVORITE:
            persistFavorite(action.payload, 0, 'toggleimagesfavorite');
            return {
                ...state, selectedGroupImages: state.selectedGroupImages.map(item => {
                    if (item.photoid == action.payload) {
                        return { ...item, isFavorite: 0 }
                    }
                    else {
                        return item;
                    }
                })
            }
        default:
            return { ...state };
    }
}


export default reducer;