import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './SearchBox.css';
import { getImagesForGroup, getImagesForGroupCache , loadMoreImages} from '../store/Actions/index';
import StaggeredCard from './StaggeredCard';
import DetailComponent from './DetailComponent';
import Scroller from 'react-bottom-scroll-listener';
import {SpinLoader} from 'react-css-loaders';


class GroupDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            currentPage:1
        }
    }
    componentDidMount() {
        console.log("Mounting the component now");
        let data = this.props.history.location.pathname.split('/');
        let nsid = data[data.length - 1];
        this.props.getImagesForGroup(nsid);
    }
    navigateToOverview = (item) => {
        let data = this.props.history.location.pathname.split('/');
        let nsid = data[data.length - 1];
        this.props.history.push(`/overview/${nsid}`, {name:"Hello World"});
    }
    reachedBottom=()=>{
        let data = this.props.history.location.pathname.split('/');
        let nsid = data[data.length - 1];
        console.log("I have reached the bottom");
        this.props.loadMoreImages(nsid, this.state.currentPage+1);
        this.setState({currentPage:this.state.currentPage+1});
    }
    render() {
        return (
            <div className="container" style={{ marginTop: '10px' }}>
                {this.props.selectedGroup ? <h5>Showing photos from "<b>{this.props.selectedGroup.name}</b>"</h5> : null}
                <Scroller onBottom={this.reachedBottom}>
                    <div className="centeredCss">
                        {this.props.loading ? <h3>Loading...</h3> : <div className="row centeredCss">
                            {this.props.selectedGroupImages ? this.props.selectedGroupImages.map((item, index) => (
                                <div className="blockImage flexer" key={index} style={{ backgroundImage: `url(${item.url})` }} onClick={() => this.navigateToOverview(item)}>
                                    <DetailComponent data={item} />
                                </div>
                            )) : null}
                            <div>
                                {this.props.scrolling?<SpinLoader/>:null}
                            </div>
                        </div>}
                    </div>
                </Scroller>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        selectedGroupImages: state.selectedGroupImages,
        loading: state.loading,
        selectedGroup: state.selectedGroup, 
        scrolling:state.scrolling
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getImagesForGroup: (data) => dispatch(getImagesForGroupCache(data)), 
        loadMoreImages:(nsid, page)=>dispatch(loadMoreImages(nsid, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GroupDetail));