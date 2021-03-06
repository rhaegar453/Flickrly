import React, { Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeGroupFavorite, removeImageFavorite } from '../../../store/Actions/index';
import db from '../../../Helpers/Dexie';
import Masonry from 'react-masonry-component';
import ZoomImage from 'react-medium-image-zoom';
import PhotoItem from '../../GalleryPage/PhotoItem/PhotoItem';
import PropTypes from 'prop-types';
const GroupFavoriteItem = React.lazy(() => import('./FavoriteGroupItem/FavoriteGroupItem'));




class FavoriteDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: null,
            data: [],
            isZoomed: false,
            selectedImage: null
        }
    }
    componentWillMount() {
        let location = this.props.history.location.pathname.split('/');
        let page = location[location.length - 1]
        this.setState({ page: page });
    }
    async componentDidMount() {
        if (this.state.page == 'groups') {
            let data = await db.groups.where('isFavorite').equals(1).toArray();
            this.setState({ data });
        } else {
            let data = await db.images.where('isFavorite').equals(1).toArray();
            this.setState({ data });
        }
    }
    removeGroupFavorite = (data) => {
        this.props.removeFavorite(data);
        this.setState({ data: this.state.data.filter(item => item.groupid != data) })
    }
    removeFavoriteImage = (data) => {
        this.setState({ data: this.state.data.filter(item => item.photoid != data) });
        this.props.removeFavoriteImage(data);
    }

    onImageZoom = (url) => {
        this.setState({ isZoomed: true, selectedImage: url })
    }

    onImageUnzoom = () => {
        this.setState({ isZoomed: false });
    }
    render() {
        return (
            <div className="container">
                {this.state.page == 'groups' ? <div>
                    <Suspense fallback={<div>Loading...</div>}>
                        {this.state.data.length == 0 ? <div>No groups here</div> : <Masonry>
                            {this.state.data.map((item, index) => (
                                <GroupFavoriteItem key={index} groupid={item.groupid} icon={item.icon} name={item.name} removeFavorite={this.removeGroupFavorite} />
                            ))}
                        </Masonry>}
                    </Suspense>
                </div> :
                    <div>
                        {this.state.data.length == 0 ? <div>No photos here</div> : <Masonry>
                            {this.state.data.map((item, index) => (
                                <PhotoItem {...item} key={index} removeFavorite={this.removeFavoriteImage} openImage={this.onImageZoom} />
                            ))}
                        </Masonry>}
                    </div>
                }
                {this.state.isZoomed && this.state.selectedImage ? <ZoomImage isZoomed={true} onUnzoom={this.onImageUnzoom} image={{ src: this.state.selectedImage }}></ZoomImage> : null}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeFavorite: (data) => dispatch(removeGroupFavorite(data)),
        removeFavoriteImage: (data) => dispatch(removeImageFavorite(data))
    }
}

FavoriteDetail.propTypes = {
    removeFavorite: PropTypes.func.isRequired,
    removeFavoriteImage: PropTypes.func.isRequired
}


export default connect(null, mapDispatchToProps)(withRouter(FavoriteDetail));