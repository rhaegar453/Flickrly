import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './SearchBox.css';
import * as actionCreators from '../store/Actions/index';
import PhotoItem from './PhotoItem/PhotoItem';
import Scroller from 'react-bottom-scroll-listener';
import { SpinLoader } from 'react-css-loaders';
import Masonry from 'react-masonry-component';




class GalleryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        }
    }
    componentDidMount() {
        console.log("Mounting the component now");
        let data = this.props.history.location.pathname.split('/');
        let groupid = data[data.length - 1];
        this.props.getImagesForGroup(groupid);
    }
    navigateToOverview = (item) => {
        let data = this.props.history.location.pathname.split('/');
        let nsid = data[data.length - 1];
        this.props.history.push(`/overview/${nsid}`, { name: "Hello World" });
    }
    reachedBottom = () => {
        let data = this.props.history.location.pathname.split('/');
        let groupid = data[data.length - 1];
        this.props.loadMoreImages(groupid, this.state.currentPage + 1);
        this.setState({ currentPage: this.state.currentPage + 1 });
    }

    render() {
        return (
            <div className="container" style={{ marginTop: '10px' }}>
                <Scroller onBottom={this.reachedBottom}>
                {this.props.selectedGroup ? <h5>Showing photos from "<b>{this.props.selectedGroup.name}</b>"</h5> : null}
                <div>
                    {this.props.selectedGroupImages?<Masonry>
                        {this.props.selectedGroupImages.map((item, index) => (
                        <PhotoItem comments={item.comments} date={item.date} key={index} description={item.description} isFavorite={item.isFavorite} views={item.views} owner={item.owner} title={item.title} url={item.url} />
                    ))}
                    </Masonry> : null}
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
        scrolling: state.scrolling
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getImagesForGroup: (data) => dispatch(actionCreators.getImagesForGroupCheckCache(data)),
        loadMoreImages: (nsid, page) => dispatch(actionCreators.loadMoreImages({ nsid, page }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GalleryPage));