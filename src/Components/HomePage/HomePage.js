import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../App.css';
import PropTypes from 'prop-types';



const HomeComponent = ({ history }) => {
    return (
        <div className="centeredCss">
            <div>
                <h1 className="centeredCss">Welcome to FlickrLy</h1>
                <div className="centeredCss">
                    <button className="btn btn-primary btn-success" style={{ marginTop: "45px" }} onClick={() => history.push('/groups')}>Go to Groups</button>
                </div>
            </div>
        </div>
    );
}

HomeComponent.propTypes={
    history:PropTypes.object.isRequired
}

export default withRouter(HomeComponent);