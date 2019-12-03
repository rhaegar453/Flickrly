import React from 'react';
import PhotoItem from '../Components/PhotoItem/PhotoItem';
import Masonry from 'react-masonry-component';
import Modal from '../Components/ModalComponent';
let _=require('lodash');
const faker=require('faker');

const data=_.times(20, i=>{
    return{
        photoid:faker.random.number(), 
        views:faker.random.number(), 
        comments:faker.random.number(), 
        title:faker.lorem.sentence(), 
        description:faker.lorem.paragraph(), 
        owner:faker.name.findName(),
        url:faker.image.image(), 
        date:faker.date.recent(), 
        isFavorite:0
    }
})
console.log(data);

const masonryOptions = {
    transitionDuration: 2
}

export default { title: "Photo Item" };

let description = "hey there this is Jon Snow and this is the  i'm writing a description for a component inside of a storybook";

export const singlePhotoItem = () => {
    return (<PhotoItem views={23} comments={420} title={"Hello World this is Jon Snow"} date="2018-01-19" description={description} owner="Jon Snow" url="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1490029386%2Fgeiranger-fjord-norway-NORWAY0320.jpg%3Fitok%3DI6xE3gDG&q=85" isFavorite={1}></PhotoItem>)
}

export const imageGrid = () => {
    return (
        <div className="row">
            <PhotoItem views={23} comments={420} title={"Hello World this is Jon Snow"} date="2018-01-19" description={description} owner="Jon Snow" url="https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" ></PhotoItem>
            <PhotoItem views={23} comments={420} title={"Hello World this is Jon Snow"} date="2018-01-19" description={description} owner="Jon Snow" url="https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" ></PhotoItem>
            <PhotoItem views={23} comments={420} title={"Hello World this is Jon Snow"} date="2018-01-19" description={description} owner="Jon Snow" url="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1490029386%2Fgeiranger-fjord-norway-NORWAY0320.jpg%3Fitok%3DI6xE3gDG&q=85" isFavorite={0}></PhotoItem>
        </div>
    )
}

export const withBrokenImage = () => {
    return (
        <div className="row">
            <PhotoItem views={23} comments={420} title={"Hello World this is Jon Snow"} date="2018-01-19" description={description} owner="Jon Snow" url="https://images.unsplash.c" ></PhotoItem>
        </div>
    )
}




export const withMasonryGridRandomData = () => {
    return (
        <div>
            <Masonry>
                {data.map(item=>(
                    <PhotoItem {...item}></PhotoItem>
                ))}
            </Masonry>
        </div>
    );
}

const openModalButton=(data)=>{
    console.log("I am here baby");
    console.log(data);
}

const makeFavorite=(photoid)=>{
    data=data.map(item=>{
        if(item.photoid==photoid){
            return {...item, isFavorite:1}
        }
    })
}

const removeFavorite=(photoid)=>{
    data=data.map(item=>{
        if(item.photoid==photoid){
            return {...item, isFavorite:0}
        }
    })
}



export const withModal = () => {
    return (
        <div>
            <Masonry>
                {data.map(item=>(
                    <PhotoItem {...item} openModal={openModalButton}></PhotoItem>
                ))}
            </Masonry>
        </div>
    );
}
