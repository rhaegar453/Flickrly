import React from 'react';
import Navbar from './Components/Navbar';
import './App.css';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import GroupComponent from './Components/GroupsPage';
import GalleryPage from './Components/GalleryPage';
import HomePage from './Components/HomePage';
import OverviewPage from './Components/OverviewPage';

import db from './Helpers/Dexie';



class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='fontCss'>
        <Navbar />
        <Switch>
          <Route path="/" exact={true}><HomePage/></Route>
          <Route path="/gallery/:nsid"><GalleryPage /></Route>
          <Route path="/groups" exact={true}><GroupComponent /></Route>
          <Route path="/overview/:nsid" exact={true}><OverviewPage /></Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups 
  }
}

export default connect(mapStateToProps, null)(App);