import React from 'react';
import Item from './RecommendationItem';
import './SearchBox.css';
import RecommendationItem from './RecommendationItem';
import { connect } from 'react-redux';
import { searchGroup, getGroups } from '../store/Actions/index';
import { withRouter } from 'react-router-dom';
import { debounce , throttle} from 'lodash';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [{ name: 'Shivaraj', icon: 'https://upload.wikimedia.org/wikipedia/wikimania2014/thumb/e/e2/Ask-Logo-Small.jpg/250px-Ask-Logo-Small.jpg' }, { name: 'sachin', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAALVBMVEX///9AoaJHpabv9/dUq6zX6+u43Nz4/PyRycml09NisrPH4+Tj8fFyubqAwMHLe1yOAAAEVElEQVRoge1a2baDIAyUfef/P/eK3ipVCGvtS+epRytDQjKEZVl++OGHH56FINYyZq0VD5Ja5Sk6gLU0D5AS6QIpps4HaI03du35R1mNRoi6i4VMbX1Bkn2KV66WqsyYqs0Pn/A58QWbLF/doad7nCOqin9igdrOpGUY1ZkiVmo5j1ciWZ2uzCE6yWii21pSte4p8aLy4F6+0DPczXRHeirkR3mN7vsMuUHeXp8RPMTM+qXIjnibjKivbQ7KWWBzsqoDHD1ZJcTwdOBjRgY+xp3OJnKbZftlyKKubvNXWUW7x8r3ZLM7C7r+scLtJnsU4bTZcrUWeVKZOi/wZsmV6A3/40wiNzhWw40bJ2eLLtjEk7w/oxVBa9pGWdAr8TbM+vrUlYewbZTNlQEF5SX4/rg4jcimbEwwrD1PEReLDdESXgmDg8kiRVyc/lyDCtzGcoNYbiNfY7NpmB6Tlq0mq+Tzgs2kXn6Snt4CO/2iYLOujmufaZ9dZeUAmNC8upBJe3pdF+V8EfqUh6it3ESu9TWjsq+A0BW1s/JNLg+YrK/BOro2rPPEDuxUFrUWs2zjiKQ1ZEPe2bVjDBDzjLbs7hgFQOxzGhIwvPkCENN8yK+R/UHitWpM6/WG0TULRKyyshbwQWIKDfLocjyfq0GhsqqJYP2qAIGaJtDbUZOhptnxltqEgI7tNAGBu0aXPn4lujgW2NmZAAV9er2VyWgYIobCGp9rOckTrhnb4QKIEditkfVdADTIBMo2VFHhQ4DUiYH5lFDsltyGRMIk1xNxzy6NNU1aQLu8RHwNr6ZwAxJKlYgvGeWbLIaKkMIYX0SENM7S+bjmhagO5XfcUKOW5U3mUOTtiOJYNW84ZYs6AgnqjtNI1l4C5uzC2QVO/J8XaMd2pks3qopDjM5U7jqcSBNgUfb04WvfN1nxRItapJ7eQF+8fZuosbOV11o7BpZ6Uf/C57J/qorCCHvFGNflwNpA9m531341cZRA2FILh4wDMySgnDhrPCX/H47UX5lQclYIQdIvQwJtkT+2ekyGtpTe+XBgz29mr/G37KVY3xHdCZaPp3Ayr2j0noY9VbaL7Shveuf0YLKLIEY6SqmTnIj/uwJo5DQhYs6I5+5afs4+jB//9MuUw2tYNajkhq8CEz2SCxl3dQCB6t072GJx38HPHalFQ877ZMuFaXdCfJ1cYr6IrSyfd5YqaiYIJV7JPXxY/0YNOxzLlfYVZHOi64DJT1B0dXIkZWOrtwQIS62sKA9XyuLqZHjXKwXLpdcUb9DOH+d9b7X+J4izcN8ijk2ees2pCPotYvctYvU4MTHGkLeVz6RZooC9LDRxdD3IG8g+KyA3vASan2E9WavTOBwsz7AePxupAD/9exA/crfpTKLzXOqRbEqU/Y8McWpD7omrz0ti83N6GZDB9Rhs8FSkAZel9IMTBIlWEi0XMCbA/ItWxTWc2SDMsGdn4R9++OGr+APqBR7+iVtKEwAAAABJRU5ErkJggg==' }, { name: 'sheela', icon: 'http://www.cbc.ca/newsblogs/community/editorsblog/cbc%20logo-small.jpg' }, { name: 'Shivaraj', icon: 'https://upload.wikimedia.org/wikipedia/wikimania2014/thumb/e/e2/Ask-Logo-Small.jpg/250px-Ask-Logo-Small.jpg' }, { name: 'sachin', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAALVBMVEX///9AoaJHpabv9/dUq6zX6+u43Nz4/PyRycml09NisrPH4+Tj8fFyubqAwMHLe1yOAAAEVElEQVRoge1a2baDIAyUfef/P/eK3ipVCGvtS+epRytDQjKEZVl++OGHH56FINYyZq0VD5Ja5Sk6gLU0D5AS6QIpps4HaI03du35R1mNRoi6i4VMbX1Bkn2KV66WqsyYqs0Pn/A58QWbLF/doad7nCOqin9igdrOpGUY1ZkiVmo5j1ciWZ2uzCE6yWii21pSte4p8aLy4F6+0DPczXRHeirkR3mN7vsMuUHeXp8RPMTM+qXIjnibjKivbQ7KWWBzsqoDHD1ZJcTwdOBjRgY+xp3OJnKbZftlyKKubvNXWUW7x8r3ZLM7C7r+scLtJnsU4bTZcrUWeVKZOi/wZsmV6A3/40wiNzhWw40bJ2eLLtjEk7w/oxVBa9pGWdAr8TbM+vrUlYewbZTNlQEF5SX4/rg4jcimbEwwrD1PEReLDdESXgmDg8kiRVyc/lyDCtzGcoNYbiNfY7NpmB6Tlq0mq+Tzgs2kXn6Snt4CO/2iYLOujmufaZ9dZeUAmNC8upBJe3pdF+V8EfqUh6it3ESu9TWjsq+A0BW1s/JNLg+YrK/BOro2rPPEDuxUFrUWs2zjiKQ1ZEPe2bVjDBDzjLbs7hgFQOxzGhIwvPkCENN8yK+R/UHitWpM6/WG0TULRKyyshbwQWIKDfLocjyfq0GhsqqJYP2qAIGaJtDbUZOhptnxltqEgI7tNAGBu0aXPn4lujgW2NmZAAV9er2VyWgYIobCGp9rOckTrhnb4QKIEditkfVdADTIBMo2VFHhQ4DUiYH5lFDsltyGRMIk1xNxzy6NNU1aQLu8RHwNr6ZwAxJKlYgvGeWbLIaKkMIYX0SENM7S+bjmhagO5XfcUKOW5U3mUOTtiOJYNW84ZYs6AgnqjtNI1l4C5uzC2QVO/J8XaMd2pks3qopDjM5U7jqcSBNgUfb04WvfN1nxRItapJ7eQF+8fZuosbOV11o7BpZ6Uf/C57J/qorCCHvFGNflwNpA9m531341cZRA2FILh4wDMySgnDhrPCX/H47UX5lQclYIQdIvQwJtkT+2ekyGtpTe+XBgz29mr/G37KVY3xHdCZaPp3Ayr2j0noY9VbaL7Shveuf0YLKLIEY6SqmTnIj/uwJo5DQhYs6I5+5afs4+jB//9MuUw2tYNajkhq8CEz2SCxl3dQCB6t072GJx38HPHalFQ877ZMuFaXdCfJ1cYr6IrSyfd5YqaiYIJV7JPXxY/0YNOxzLlfYVZHOi64DJT1B0dXIkZWOrtwQIS62sKA9XyuLqZHjXKwXLpdcUb9DOH+d9b7X+J4izcN8ijk2ees2pCPotYvctYvU4MTHGkLeVz6RZooC9LDRxdD3IG8g+KyA3vASan2E9WavTOBwsz7AePxupAD/9exA/crfpTKLzXOqRbEqU/Y8McWpD7omrz0ti83N6GZDB9Rhs8FSkAZel9IMTBIlWEi0XMCbA/ItWxTWc2SDMsGdn4R9++OGr+APqBR7+iVtKEwAAAABJRU5ErkJggg==' }, { name: 'sheela', icon: 'http://www.cbc.ca/newsblogs/community/editorsblog/cbc%20logo-small.jpg' }],
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
    }, 1000);
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
        console.log(e.key);
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
                        <RecommendationItem key={item.name} onClick={() => this.selectItem(item)} icon={this.createIconURL(item)} text={item.name}></RecommendationItem>
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
        searchGroup: (query) => dispatch(searchGroup(query)),
        getGroups: (query) => dispatch(getGroups(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBox));