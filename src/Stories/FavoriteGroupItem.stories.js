import React from 'react';
import FavoriteGroupItem from '../Components/FavoritesPage/FavoriteDetail/FavoriteGroupItem/FavoriteGroupItem';
let faker = require('faker');
let _ = require('lodash');

function removeFavorite(data) {
    console.log("Removing favorite ", data);
}


const data = _.times(10, i => {
    return {
        groupid: faker.random.alphaNumeric(),
        icon: faker.image.avatar(),
        name: faker.name.firstName(),
        removeFavorite: removeFavorite
    }
})

export default { title: "Favorite Group Item" };


export const individualGroupItem = () => {
    return <FavoriteGroupItem {...data[0]} />
}


export const multipleFavorites = () => {
    return data.map(item => (
        <FavoriteGroupItem {...item} />
    ))
}

