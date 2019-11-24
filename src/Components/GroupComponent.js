import React from 'react';
import GroupCard from './GroupCard';
import '../App.css';
import { connect } from 'react-redux';
import Search from './Search';
import Chart from './Chart';
import Modal from './ModalComponent';
import ModalButton from './ModalButton';


class GroupComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
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
                        {this.props.groups.map(item => (
                            <GroupCard data={item} key={item.nsid}></GroupCard>
                        ))}
                    </div>
                </div> : null}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        groups: state.groups
    }
}

export default connect(mapStateToProps)(GroupComponent);