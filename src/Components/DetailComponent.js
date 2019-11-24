import React from 'react';
import './SearchBox.css';
import moment from 'moment';

const DetailComponent = ({ data }) => {
    return (
        <div className="imageCard">
            <p className="imageTitleText">{data.title.length >= 20 ? data.title.substring(0, 25) + "..." : data.title}</p>
            <p className="imageDescriptionText">{data.description.length >= 20 ? data.description.substring(0, 25) + "..." : data.description}</p>
            <p style={{color:'white', fontSize:'8px', marginBottom:"0px"}}>By <b>{data.owner}</b></p>
            <div className="spaceAroundCss">
                <div className="smallTextCss">Views: <b>{data.views}</b></div>
                <div className="smallTextCss">Comments: <b>{data.comments}</b></div>
                <div className="smallTextCss">Uploaded: <b>{moment.unix(data.date).format('DD/MM/YYYY')}</b></div>
            </div>
        </div>
    );
}

export default DetailComponent;