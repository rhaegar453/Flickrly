import React from 'react';
import './GroupItem.css'
import PropTypes from 'prop-types';


const onErrorImages = (e) => {
    e.target.src = "https://live.staticflickr.com/3632/3341035111_dbbc8bca0d.jpg";
}

const GroupItem = ({ groupid, iconURL, title, members, photos, makeFavorite, removeFavorite, isFavorite, onClick }) => {
    return (
        <div style={{ position: 'relative', display: 'block' }} >
            <div className="gridblock">
                <div style={{ position: 'absolute', marginTop: '5px', marginLeft: '5px' }}>
                    {!isFavorite ? <button className="btn btn-danger" onClick={() => makeFavorite(groupid)}>Add Favorite</button> : <button className="btn btn-success" onClick={() => removeFavorite(groupid)}>Remove Favorite</button>}
                </div>
                <div onClick={onClick}>
                    <div className="div-block-6"><img style={{ borderRadius: '20px', marginTop: '20px' }} src={iconURL} width="69" alt=""></img></div>
                    <div className="div-block-7">
                        <h4 style={{ padding: '15px' , fontWeight:'bold'}}>{title}</h4>
                    </div>
                    <div>
                        <p className="paragraph">Members: {members}</p>
                    </div>
                    <div className="w-layout-grid grid-2">
                        {photos.map((item, index) => (
                            <div key={index}>
                                <img src={item.url} onError={onErrorImages} width={"100%"} height="100px" style={{ objectFit: 'cover' }} className="image-2"></img>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
GroupItem.propTypes = {
    iconURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    members: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired,
    isFavorite: PropTypes.number.isRequired,
}


export default GroupItem;