import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../App.css';
import PropTypes from 'prop-types';



const HomeComponent = ({ history }) => {
    return (
        <div className="section-2">
            <div className="container-2 w-container">
                <div className="div-block-25">
                    <div>
                        <h1 className="heading-4">FlickrLy</h1>
                        <button className="btn btn-block btn-lg mybutton"  onClick={()=>history.push('/groups')}>Go to Groups</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

HomeComponent.propTypes = {
    history: PropTypes.object.isRequired
}

export default withRouter(HomeComponent);