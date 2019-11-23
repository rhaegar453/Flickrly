import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { selectGroup , getImagesForGroup} from '../store/Actions/index';
import { withRouter } from 'react-router-dom';

class GroupCard extends React.Component {
    constructor(props) {
        super(props);
    }

    createIconURL = ({ nsid, iconserver, iconfarm }) => {
        return `http://farm${iconfarm}.staticflickr.com/${iconserver}/buddyicons/${nsid}.jpg`
    }
    handleClick = () => {
        this.props.selectGroup(this.props.data);
/*         this.props.getImagesForGroup(this.props.data); */
        this.props.history.push(`/gallery/${this.props.data.nsid}`);
    }
    imageFallbackOnError = (e) => {
        e.target.src = `http://icons.iconarchive.com/icons/bokehlicia/pacifica/256/flickr-icon.png`
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                <div class="gridblock">
                    <div class="div-block-6"><img style={{ borderRadius: '20px', marginTop: '20px' }} src={this.createIconURL(this.props.data)} onError={this.imageFallbackOnError} width="69" alt=""></img></div>
                    <div class="div-block-7">
                        <h4 style={{ padding: '15px' }}>{this.props.data.name}</h4>
                    </div>
                    <div>
                        <p class="paragraph">Members: {this.props.data.members}</p>
                    </div>
                    <div class="w-layout-grid grid-2">
                        {this.props.data.photos.map(item => (
                            <div key={item}>
                                {console.log(item)}
                                <img src={item.url} id="w-node-c2b4d253d288-b7e90bd6" width={"100%"} height="100px" style={{ objectFit: 'cover' }} onError={this.imageFallbackOnError} class="image-2"></img>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        selectGroup: (groupDetails) => dispatch(selectGroup(groupDetails)), 
        getImagesForGroup:(data)=>dispatch(getImagesForGroup(data))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(GroupCard));