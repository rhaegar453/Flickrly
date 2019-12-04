import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeGroupFavorite, removeImageFavorite } from '../../../store/Actions/index';
import db from '../../../Helpers/Dexie';
import GroupFavoriteItem from './FavoriteGroupItem/FavoriteGroupItem';
import Masonry from 'react-masonry-component';
import PhotoItem from '../../GalleryPage/PhotoItem/PhotoItem';
import ZoomImage from 'react-medium-image-zoom';

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
            console.log(data);
            this.setState({ data });
        } else {
            let data = await db.images.where('isFavorite').equals(1).toArray();
            console.log(data);
            this.setState({ data });
        }
    }
    removeGroupFavorite = (data) => {
        console.log(data);
        this.props.removeFavorite(data);
        this.setState({ data: this.state.data.filter(item => item.groupid != data) })
    }
    removeFavoriteImage = (data) => {
        console.log("Removing favorite image ", data);
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
                    <Masonry>
                        {this.state.data.map(item => (
                            <GroupFavoriteItem groupid={item.groupid} icon={item.icon} name={item.name} removeFavorite={this.removeGroupFavorite} />
                        ))}
                    </Masonry>
                </div> :
                    <Masonry>
                        {this.state.data.map(item => (
                            <PhotoItem {...item} removeFavorite={this.removeFavoriteImage} openImage={this.onImageZoom} />
                        ))}
                    </Masonry>
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


export default connect(null, mapDispatchToProps)(withRouter(FavoriteDetail));