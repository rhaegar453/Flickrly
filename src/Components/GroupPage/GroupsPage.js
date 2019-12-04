import React, { Suspense } from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import { loadMoreGroups, selectGroup, makeGroupFavorite, removeGroupFavorite } from '../../store/Actions/index';
import ScrollListener from 'react-bottom-scroll-listener';
import { SpinLoader } from 'react-css-loaders';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const GroupItem = React.lazy(() => import('./GroupItem/GroupItem'));
const Search = React.lazy(() => import('../Search/Search'));
const Chart = React.lazy(() => import('../Chart'));
const Modal = React.lazy(() => import('../Modals/ModalComponent'));
const ModalButton = React.lazy(() => import('../Modals/ModalButton'));





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
        this.props.makeGroupFavorite(id);
    }
    onRemoveFavorite = (id) => {
        this.props.removeGroupFavorite(id);
    }
    render() {
        return (
            <ScrollListener onBottom={() => this.loadMore()}>
                <div className="container">
                    <div className="centeredCss" style={{ marginTop: '20px' }}>
                        <div className="col-md-4">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Search />
                            </Suspense>
                        </div>
                    </div>
                    {this.props.groups.length > 0 ? <div className="container marginate">
                        <h1><u>Results</u></h1>
                        <Suspense fallback={<div>Loading...</div>}>
                            <div className="centeredCss" style={{marginBottom:'30px'}}>
                                <ModalButton id="Hello" name="View Chart" />
                                <Modal modalID="Hello" title="First Modal">
                                    <Chart data={this.props.groups} />
                                </Modal>
                            </div>
                        </Suspense>
                        <div className="w-layout-grid grid">
                            <Suspense fallback={<div>Loading...</div>}>
                                {this.props.groups.map(item => (
                                    <GroupItem groupid={item.groupid} makeFavorite={this.onMakeFavorite} removeFavorite={this.onRemoveFavorite} iconURL={item.icon} onClick={() => this.selectGroup(item)} isFavorite={item.isFavorite} key={item.groupid} members={parseInt(item.members)} photos={item.photos} title={item.name} />
                                ))}
                            </Suspense>
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
        makeGroupFavorite: (data) => dispatch(makeGroupFavorite(data)),
        removeGroupFavorite: (data) => dispatch(removeGroupFavorite(data))
    }
}

GroupPage.propTypes = {
    groups: PropTypes.arrayOf(PropTypes.shape({
        groupid:PropTypes.string,
        icon:PropTypes.string,
        isFavorite:PropTypes.oneOf([1,0]),
        members:PropTypes.string,
        name:PropTypes.string,
        photos:PropTypes.arrayOf(PropTypes.shape({id:PropTypes.string, url:PropTypes.string})),
        text:PropTypes.string,
        total:PropTypes.number
    })),
    searchQuery: PropTypes.string,
    currentPage: PropTypes.number,
    scrolling: PropTypes.bool,
    loading: PropTypes.bool
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GroupPage));