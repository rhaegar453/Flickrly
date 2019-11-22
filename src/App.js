import React from 'react';
import Navbar from './Components/Navbar';
import './App.css';
import Search from './Components/Search';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='fontCss'>
        <Navbar />
        <div className="centeredCss" style={{ marginTop: '20px' }}>
          <div className="col-md-4">
            <Search />
          </div>
        </div>
        <div className="container marginate">
          <h1><u>Results</u></h1>
        </div>
      </div>
    );
  }
}

export default App;