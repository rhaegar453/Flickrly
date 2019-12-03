import React from 'react';
import PropTypes from 'prop-types';
import './FavoriteGroupItem.css';

const handleImageError = (e) => {
    e.target.src = "https://123images.co/movies/1238108198-poster-Andhadhun.jpg";
}


const FavoriteGroupItem = ({ groupid, icon, name, removeFavorite, viewGroup }) => (
    <div className="item col-md-3" style={{ padding: '20px' }}>
        <div>
            <div className="centeredCss">
                <img src={icon} height="50px" style={{ borderRadius: '50%', boxShadow: '5px 5px #ffffff blur' }} onError={handleImageError}></img>
            </div>
            <div className="centeredCss makeCenter" style={{ color: 'white', margin: '5px' }} >
                {name}
            </div>
            <div className="centeredCss">
                <div className="makeCenter">
                    <button className="btn btn-danger btn-sm btnmod" onClick={() => removeFavorite(groupid)}>Remove</button>
                </div>
            </div>
        </div>
    </div>
)

FavoriteGroupItem.propTypes = {
    groupid: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    removeFavorite: PropTypes.func.isRequired
}

export default FavoriteGroupItem;