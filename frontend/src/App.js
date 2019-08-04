import React from 'react';
import './App.scss';
// import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router'


class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" render={() => <Redirect to="/inbox"/> }/>
          <Route path="/inbox" component={() => <Main getNotes={1}/>} />
          <Route path="/archive" component={() => <Main getNotes={2}/>} />
          <Route path="/trash" component={() => <Main getNotes={3}/>} />
        </Router>
        <Footer/>
      </div>
    ); 
  }
}

export default App;
