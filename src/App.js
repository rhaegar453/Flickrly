import React from 'react';
import Navbar from './Components/Navbar';
import './App.css';
import Search from './Components/Search';
import { isModuleDeclaration } from '@babel/types';
import GroupCard from './Components/GroupCard';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import GroupComponent from './Components/GroupComponent';
import GroupDetail from './Components/GroupDetail';
import Chart from './Components/Chart';
import ModalButton from './Components/ModalButton';
import Modal from './Components/ModalComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='fontCss'>
        <Navbar />
        <Switch>
          <Route path="/gallery/:nsid"><GroupDetail /></Route>
          <Route path="/groups" exact={true}><GroupComponent /></Route>
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