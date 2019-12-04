import React from 'react';
import GroupItem from '../Components/GroupPage/GroupItem/GroupItem';
import faker from 'faker';
import _ from 'lodash';

export default { title: "Group Item" };

function makeFavorite(data) {
    console.log(data);
    console.log("Make Favorite working");
}
function removeFavorite(data) {
    console.log(data);
    console.log("Removing Favorite working");
}

function onClick(data){
    console.log("On Click button pressed ", data)
}

let data=_.times(10, (i)=>{
    let photos=_.times(8, (i)=>{
        return faker.image.imageUrl();
    })
    return {groupid:faker.random.alphaNumeric(), iconURL:faker.image.avatar(), title:faker.random.words(), members:faker.random.number(),photos:photos,removeFavorite:removeFavorite, makeFavorite:makeFavorite, isFavorite:faker.random.boolean,onClick:onClick }
})


export const individualItem = () => {
    return (
        <GroupItem {...data[0]} />
    )
}
