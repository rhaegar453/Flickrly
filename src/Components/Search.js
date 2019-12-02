import React from 'react';
import './SearchBox.css';
import RecommendationItem from './RecommendationItem/RecommendationItem';
import { connect } from 'react-redux';
import * as actionCreators from '../store/Actions/index';
import { withRouter } from 'react-router-dom';
import { debounce , throttle} from 'lodash';
import PropTypes from 'prop-types';


class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            showRecommendations: true,
            selectedGroup: {}
        }
    }
    changeInputText = (text) => {
        this.setState({ searchQuery: text, showRecommendations: true });
        this.makeCall();
    };
    makeCall=debounce(()=>{
        this.props.searchGroup(this.state.searchQuery);
    }, 500);
    createIconURL = ({ nsid, iconserver, iconfarm }) => {
        return `http://farm${iconfarm}.staticflickr.com/${iconserver}/buddyicons/${nsid}.jpg`
    }
    selectItem = (item) => {
        this.setState({ selectedGroup: item, showRecommendations: false, searchQuery: item.name }, () => {
            this.props.getGroups(this.state.searchQuery);
            this.props.history.push('/groups');
        });
    }
    handleEnterButton = (e) => {
        if (e.key == 'Enter') {
            this.props.getGroups(this.state.searchQuery);
            this.setState({ showRecommendations: false });
            this.props.history.push('/groups');
        }
    }

    render() {
        return (
            <div>
                <input className="form-control inputBox" value={this.state.searchQuery}  placeholder="Search for Groups" onChange={(e) => this.changeInputText(e.target.value)} onKeyPress={this.handleEnterButton}></input>
                {this.props.groupRecommendations && this.state.showRecommendations && this.state.searchQuery != '' ? <div className='boxPosition'>
                    {this.props.groupRecommendations.map(item => (
                        <RecommendationItem icon={item.icon} key={item.groupid} onClick={()=>this.selectItem(item)} text={item.name} />
                    ))}
                </div> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        groupRecommendations: state.groupRecommendations,
        searchQuery: state.searchQuery
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchGroup: (query) => dispatch(actionCreators.searchGroupCheckCache(query)),
        getGroups: (query) => dispatch(actionCreators.getGroupsCheckCache(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBox));