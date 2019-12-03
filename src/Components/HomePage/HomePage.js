import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';


const HomeComponent=()=>{
    return(
        <div className="centeredCss">
            <div>
            <h1 className="centeredCss">Welcome to FlickrLy</h1>
            <div className="centeredCss">
            <button className="btn btn-primary btn-success" style={{marginTop:"45px"}}><Link to="/groups" style={{color:'white'}}>Go to Groups</Link></button>
            </div>
            </div>
        </div>
    );
}

export default HomeComponent;