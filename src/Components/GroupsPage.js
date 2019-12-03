import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import Search from './Search';
import Chart from './Chart';
import Modal from './ModalComponent';
import ModalButton from './ModalButton';
import { loadMoreGroups, selectGroup, makeGroupFavorite, removeGroupFavorite } from '../store/Actions/index';
import { throttle, debounce, select } from 'redux-saga/effects';
import ScrollListener from 'react-bottom-scroll-listener';
import { SpinLoader } from 'react-css-loaders';
import GroupItem from './GroupItem/GroupItem';
import { withRouter } from 'react-router-dom';


class GroupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrolling: false
        }
    }

    loadMore = () => {
        this.props.loadMore(this.props.currentPage + 1, this.props.searchQuery);
    }
    selectGroup = (data) => {
        this.props.selectGroup(data);
        this.props.history.push(`/gallery/${data.groupid}`);
    }

    onMakeFavorite = (id) => {
        console.log('Making group favorite', id);
        this.props.makeGroupFavorite(id);
    }
    onRemoveFavorite = (id) => {
        console.log("Remove group favorite ", id);
        this.props.removeGroupFavorite(id);
    }
    render() {
        return (
            <ScrollListener onBottom={() => this.loadMore()}>
                <div className="container">
                    <div className="centeredCss" style={{ marginTop: '20px' }}>
                        <div className="col-md-4">
                            <Search />
                        </div>
                    </div>
                    {this.props.groups.length > 0 ? <div className="container marginate">
                        <h1><u>Results</u></h1>
                        <div className="centeredCss">
                            <ModalButton id="Hello" name="View Chart" />
                            <Modal modalID="Hello" title="First Modal">
                                <Chart data={this.props.groups} />
                            </Modal>
                        </div>
                        <div className="w-layout-grid grid">
                            {this.props.groups.map(item => (
                                <GroupItem groupid={item.groupid} makeFavorite={this.onMakeFavorite} removeFavorite={this.onRemoveFavorite} iconURL={item.icon} onClick={() => this.selectGroup(item)} isFavorite={item.isFavorite} key={item.groupid} members={parseInt(item.members)} photos={item.photos} title={item.name} />
                            ))}
                            {this.props.scrolling ? <SpinLoader /> : null}
                        </div>
                    </div> : null}
                </div>
            </ScrollListener>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        groups: state.groups,
        searchQuery: state.searchQuery,
        currentPage: state.currentPage,
        scrolling: state.scrolling,
        loading: state.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadMore: (data, searchQuery) => dispatch(loadMoreGroups({ data, searchQuery })),
        selectGroup: (data) => dispatch(selectGroup(data)), 
        makeGroupFavorite:(data)=>dispatch(makeGroupFavorite(data)),
        removeGroupFavorite:(data)=>dispatch(removeGroupFavorite(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GroupPage));