import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../App.css';
import PropTypes from 'prop-types';



const HomeComponent = ({ history }) => {
    return (
        <div class="section-2">
            <div class="container-2 w-container">
                <div class="div-block-25">
                    <div>
                        <h1 class="heading-4">FlickrLy</h1>
                        <button className="btn btn-block btn-lg btn-danger" onClick={()=>history.push('/groups')}>Go to Groups</button>
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