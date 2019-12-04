import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../Search/SearchBox.css';
import * as actionCreators from '../../store/Actions/index';
import Scroller from 'react-bottom-scroll-listener';
import { SpinLoader } from 'react-css-loaders';
import Masonry from 'react-masonry-component';
import ZoomImage from 'react-medium-image-zoom';
import PropTypes from 'prop-types';
import PhotoItem from './PhotoItem/PhotoItem';
import { prototype } from 'events';



class GalleryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            isZoomed: false,
            selectedImage: null
        }
    }
    componentDidMount() {
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

    makeFavorite = (data) => {
        this.props.makeImageFavorite(data);
    }
    removeFavorite = (data) => {
        this.props.removeImageFavorite(data);
    }
    handleZoom = (url) => {
        this.setState({ selectedImage: url, isZoomed: true });
    }
    handleUnzoom = () => {
        this.setState({ isZoomed: false });
    }

    render() {
        return (
            <Scroller onBottom={this.reachedBottom} offset={800}>
                <div className="container" style={{ marginTop: '10px' }}>
                    {this.props.selectedGroup ? <h5>Showing photos from "<b>{this.props.selectedGroup.name}</b>"</h5> : null}
                    <div className="centeredCss" style={{margin:'30px'}}>
                    <button className="btn btn-primary" onClick={this.navigateToOverview}>Show Overview</button>
                    </div>
                    <div>
                        {this.props.selectedGroupImages ? <Masonry>
                            {this.props.selectedGroupImages.map((item, index) => (
                                <PhotoItem openImage={this.handleZoom} makeFavorite={this.makeFavorite} removeFavorite={this.removeFavorite} photoid={item.photoid} comments={item.comments} date={item.date} key={index} description={item.description} isFavorite={item.isFavorite} views={item.views} owner={item.owner} title={item.title} url={item.url} />
                            ))}
                        </Masonry> : null}
                    </div>
                    {this.state.isZoomed && this.state.selectedImage.length > 0 ? <ZoomImage image={{ src: this.state.selectedImage }} isZoomed={this.state.isZoomed} onUnzoom={this.handleUnzoom} zoomImage={{ src: this.state.selectedImage }} /> : null}
                </div>
            </Scroller>
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
        loadMoreImages: (nsid, page) => dispatch(actionCreators.loadMoreImages({ nsid, page })),
        makeImageFavorite: (data) => dispatch(actionCreators.makeImageFavorite(data)),
        removeImageFavorite: (data) => dispatch(actionCreators.removeImageFavorite(data))
    }
}

GalleryPage.propTypes = {
    selectedGroupImages: PropTypes.arrayOf(PropTypes.shape({
        comments:PropTypes.string, 
        date:PropTypes.string,
        description:PropTypes.string,
        groupid:PropTypes.string,
        isFavorite:PropTypes.oneOf([1,0]),
        likes:PropTypes.number,
        owner:PropTypes.string,
        photoid:PropTypes.string,
        title:PropTypes.string,
        url:PropTypes.string,
        views:PropTypes.string
    })),
    loading: PropTypes.bool,
    selectedGroup: PropTypes.PropTypes.shape({
        groupid:PropTypes.string,
        icon:PropTypes.string,
        isFavorite:PropTypes.oneOf([1,0]),
        members:PropTypes.string, 
        name:PropTypes.string,
        photos:PropTypes.array,
        text:PropTypes.string, 
        total:PropTypes.number
    }),
    scrolling: PropTypes.bool,
    getImagesForGroup: PropTypes.func.isRequired,
    loadMoreImages: PropTypes.func.isRequired,
    makeImageFavorite: PropTypes.func.isRequired,
    makeImageFavorite: PropTypes.func.isRequired,
    removeImageFavorite: PropTypes.func.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GalleryPage));