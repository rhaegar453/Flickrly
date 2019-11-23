import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './SearchBox.css';
import {getImagesForGroup} from '../store/Actions/index';

class GroupDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getImagesForGroup();
    }
    render() {
        return (
            <div className="container">
                {this.props.loading ? <h3>Loading...</h3> : <div className="row">
                    {this.props.selectedGroupImages ? this.props.selectedGroupImages.map(item => (
                        <div>
                            <img src={item.url} className="staggeredImage"></img>
                        </div>
                    )) : null}
                </div>}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        selectedGroupImages: state.selectedGroupImages,
        loading: state.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getImagesForGroup:()=>dispatch(getImagesForGroup())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GroupDetail));