import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './SearchBox.css';
import { getImagesForGroup, getImagesForGroupCache } from '../store/Actions/index';
import StaggeredCard from './StaggeredCard';
import DetailComponent from './DetailComponent';

class GroupDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("Mounting the component now");
        let data=this.props.history.location.pathname.split('/');
        let nsid=data[data.length-1];
        this.props.getImagesForGroup(nsid);
    }
    render() {
        return (
            <div className="container" style={{marginTop:'10px'}}>
                {this.props.selectedGroup?<h5>Showing photos from "<b>{this.props.selectedGroup.name}</b>"</h5>:null}
                <div className="centeredCss">
                {this.props.loading ? <h3>Loading...</h3> : <div className="row centeredCss">
                    {this.props.selectedGroupImages ? this.props.selectedGroupImages.map(item => (
                        <div className="blockImage flexer" style={{ backgroundImage: `url(${item.url})` }}>
                            <DetailComponent data={item}/>
                        </div>
                    )) : null}
                </div>}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        selectedGroupImages: state.selectedGroupImages,
        loading: state.loading,
        selectedGroup:state.selectedGroup
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getImagesForGroup: (data) => dispatch(getImagesForGroupCache(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GroupDetail));