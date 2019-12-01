import React from 'react';
import './GroupItem.css'
import PropTypes from 'prop-types';


const GroupItem = ({ groupid,iconURL, title, members, photos, makeFavorite, removeFavorite, isFavorite }) => {
    return (
        <div className="col-md-4 col-sm-6" style={{ position: 'relative', display: 'block' }}>
            <div className="gridblock">
                <div style={{position:'absolute', marginTop:'5px', marginLeft:'5px'}}>
                    {isFavorite ? <button className="btn btn-danger" onClick={()=>makeFavorite(groupid)}>Add Favorite</button> : <button className="btn btn-success" onClick={()=>removeFavorite(groupid)}>Remove Favorite</button>}
                </div>
                <div className="div-block-6"><img style={{ borderRadius: '20px', marginTop: '20px' }} src={iconURL} width="69" alt=""></img></div>
                <div className="div-block-7">
                    <h4 style={{ padding: '15px' }}>{title}</h4>
                </div>
                <div>
                    <p className="paragraph">Members: {members}</p>
                </div>
                <div className="w-layout-grid grid-2">
                    {photos.map((item, index) => (
                        <div key={index}>
                            <img src={item} width={"100%"} height="100px" style={{ objectFit: 'cover' }} className="image-2"></img>
                        </div>
                    ))}
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
    toggleFavorite: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired
}


export default GroupItem;