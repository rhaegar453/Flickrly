import React from 'react';
import GroupCard from './GroupCard';
import '../App.css';
import { connect } from 'react-redux';
import Search from './Search';


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
                {this.props.groups.length>0?                <div className="container marginate">
                    <h1><u>Results</u></h1>
                    <div className="w-layout-grid grid">
                        {this.props.groups.map(item => (
                            <GroupCard data={item} key={item.nsid}></GroupCard>
                        ))}
                    </div>
                </div>:null}
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