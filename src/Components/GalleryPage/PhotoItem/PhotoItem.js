import React from 'react';
import moment from 'moment';
import { ReactFragment } from 'react';
import './PhotoItem.css';
import PropTypes from 'prop-types';



const handleImageError = (e) => {
    e.target.src = 'https://images.vexels.com/media/users/3/137278/isolated/preview/d51ab2c086a7046cded42a02cb44c8ab-flickr-icon-logo-by-vexels.png'
}



const PhotoItem = ({ photoid, views, comments, date, description, owner, title, url, isFavorite, makeFavorite, removeFavorite, openImage }) => {
    return (
        <div className="col-md-3 col-sm-6 col-xs-6 myPos">
            <div className="imageBackground">
                <div className="imageDescription">
                    <div className="scrollview">
                        <h6 className="textPadding">{title}</h6>
                        <p className="textPadding">{description}</p>
                        <p className="textPadding ownerText">By <b>{owner}</b></p>
                    </div>
                    <div className="row centeredCss">
                        <div>
                            <div className="centeredCss">
                                <div style={{ textAlign: 'center' }} className="row rowItems">
                                    <div><i className="fa fa-eye"></i> {views}</div>
                                    <div><i className="fa fa-comments"></i>  {comments} </div>
                                    <div><i className="fa fa-calendar"></i> {moment.unix(date).format('DD/MM/YYYY')} </div>
                                </div>
                            </div>
                            <div className="row centeredCss">
                                {!isFavorite ? <button className="btn btn-danger" onClick={() => makeFavorite(photoid)} style={{ marginBottom: "20px" }} title="Make Favorite"><i className="fa fa-heart"></i> Make Favorite</button> :
                                    <button className="btn btn-primary btn-log" onClick={() => removeFavorite(photoid)} style={{ marginBottom: "20px" }}>Remove Favorite</button>}
                            </div>
                            <div className="centeredCss">
                                <button className="btn btn-success" style={{ padding: '5px' }} onClick={() => openImage(url)}>Open Image</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="centeredCss centeredImage">
                    <img src={url} className="photoimage" onError={handleImageError} style={{ borderRadius: "24px" }}></img>
                </div>
            </div>
        </div>
    );
}

PhotoItem.propTypes = {
    photoid: PropTypes.string.isRequired,
    views: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string,
    owner: PropTypes.string.isRequired,
    title: PropTypes.string,
    url: PropTypes.string,
    isFavorite: PropTypes.number,
    makeFavorite: PropTypes.func,
    removeFavorite: PropTypes.func.isRequired,
    openImage: PropTypes.func.isRequired
}

export default PhotoItem; 