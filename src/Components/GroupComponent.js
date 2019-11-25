import React from 'react';
import GroupCard from './GroupCard';
import '../App.css';
import { connect } from 'react-redux';
import Search from './Search';
import Chart from './Chart';
import Modal from './ModalComponent';
import ModalButton from './ModalButton';
import { loadMore } from '../store/Actions';
import { throttle, debounce } from 'redux-saga/effects';
import ScrollListener from 'react-bottom-scroll-listener';


class GroupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrolling: false
        }
    }


    loadMore = () => {
        console.log("Loading more content");
        this.props.loadMore(this.props.currentPage + 1, this.props.searchQuery);
    }
    render() {
        return (
            <ScrollListener onBottom={()=>this.loadMore()}>
                <div>
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
                        {this.props.groups.map((item, index) => (
                            <GroupCard data={item} key={index}></GroupCard>
                        ))}
                    </div>
                    {/*                     <button className="btn btn-success" onClick={this.loadMore}>Load More</button> */}
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
        scrolling: state.scrolling
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadMore: (data, searchQuery) => dispatch(loadMore(data, searchQuery))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupComponent);