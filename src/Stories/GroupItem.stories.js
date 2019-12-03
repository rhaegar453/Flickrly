import React from 'react';
import GroupItem from '../Components/GroupPage/GroupItem/GroupItem';

export default { title: "Group Item" };

function makeFavorite(data) {
    console.log(data);
    console.log("Make Favorite working");
}
function removeFavorite(data) {
    console.log(data);
    console.log("Removing Favorite working");
}

let data1 = {
    iconURL: 'https://icons-for-free.com/iconfiles/png/512/design+development+facebook+framework+mobile+react+icon-1320165723839064798.png',
    title: "Hello World", members: 23, photos: [
        'https://pix10.agoda.net/hotelImages/5673739/0/84a6695df6d88a1bdaf2b5e5f4abfc5f.jpg?s=1024x768',
        'https://a.cdn-hotels.com/gdcs/production75/d966/8994658f-13ad-4106-bde4-856450359f47.jpg',
        'https://img.jakpost.net/c/2019/03/19/2019_03_19_67991_1552969698._large.jpg',
        'https://pix10.agoda.net/hotelImages/255129/-1/4be994f3bf41842cbef6626c815d18a5.jpg?s=1024x768',
        'https://www.outsideonline.com/sites/default/files/styles/img_500x800/public/2019/08/28/norway-trolltunga-travel_s.jpg?itok=UPVNLLUq',
        'https://economictimes.indiatimes.com/img/66570640/Master.jpg',
        'https://assets.kpmg/content/dam/kpmg/xx/images/2019/08/lighted-houses-on-snow-covered-mountains-during-sunset-norway.jpg/jcr:content/renditions/cq5dam.web.512.341.jpg',
        'https://media.timeout.com/images/105237855/630/472/image.jpg'
    ], makeFavorite: makeFavorite, removeFavorite: removeFavorite, isFavorite: 0,
    groupid: 23
}

let data2 = {
    iconURL: 'https://icons-for-free.com/iconfiles/png/512/design+development+facebook+framework+mobile+react+icon-1320165723839064798.png',
    title: "Hello World", members: 23, photos: [
        'https://pix10.agoda.net/hotelImages/5673739/0/84a6695df6d88a1bdaf2b5e5f4abfc5f.jpg?s=1024x768',
        'https://a.cdn-hotels.com/gdcs/production75/d966/8994658f-13ad-4106-bde4-856450359f47.jpg',
        'https://img.jakpost.net/c/2019/03/19/2019_03_19_67991_1552969698._large.jpg',
        'https://pix10.agoda.net/hotelImages/255129/-1/4be994f3bf41842cbef6626c815d18a5.jpg?s=1024x768',
        'https://www.outsideonline.com/sites/default/files/styles/img_500x800/public/2019/08/28/norway-trolltunga-travel_s.jpg?itok=UPVNLLUq',
        'https://economictimes.indiatimes.com/img/66570640/Master.jpg',
        'https://assets.kpmg/content/dam/kpmg/xx/images/2019/08/lighted-houses-on-snow-covered-mountains-during-sunset-norway.jpg/jcr:content/renditions/cq5dam.web.512.341.jpg',
        'https://media.timeout.com/images/105237855/630/472/image.jpg'
    ], makeFavorite: makeFavorite, removeFavorite: removeFavorite, isFavorite: 1,
    groupid: 23
}


export const individualItem = () => {
    return (
        <div className="row">
            <GroupItem {...data1}></GroupItem>
            <GroupItem {...data2}></GroupItem>
            <GroupItem {...data2}></GroupItem>
        </div>
    )
}