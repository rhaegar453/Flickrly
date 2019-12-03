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
                db.groups.put({ groupid: item.nsid, icon: iconUrl, name: item.name, photos: item.photos, members: item.members, text: text, isFavorite: false });
            })
        }
        else if (action == 'search') {
            payload.map(item => {
                let iconUrl = `http://farm${item.iconfarm}.staticflickr.com/${item.iconserver}/buddyicons/${item.nsid}.jpg`;
                db.search.put({ groupid: item.nsid, icon: iconUrl, name: item.name, text: text })
            })
        }
        else if (action == 'images') {
            console.log(payload);
            payload.map(item => {
                db.images.put({ groupid: text, ...item, isFavorite: false });
            })
        }
    }
    catch (err) {
        console.log(err);
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
                return { groupid: item.nsid, icon: iconUrl, name: item.name, photos: item.photos, members: item.members, text: action.payload.text, isFavorite: false };
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
            console.log(action);
            return { ...state, selectedGroupImages: action.payload };
        case actions.LOAD_MORE_GROUPS_SUCCESS:
            let filteredData = action.payload.data.filter(item => item);
            let sessionData = JSON.parse(sessionStorage.getItem(action.payload.text));
            let newData = { ...sessionData, get: [...state.groups, ...filteredData] };
            sessionStorage.setItem(action.payload.text, JSON.stringify(newData));
            return { ...state, currentPage: action.payload.page, groups: [...state.groups, ...filteredData], scrolling: false };
        case actions.LOAD_MORE_GROUPS_START:
            return { ...state, scrolling: true };
        case actions.LOAD_MORE_IMAGES_START:
            return { ...state, scrolling: true };
        case actions.LOAD_MORE_IMAGES_SUCCESS:
            return { ...state, scrolling: false, selectedGroupImages: [...state.selectedGroupImages, ...action.payload.photos] };
        default:
            return { ...state };
    }
}


export default reducer;