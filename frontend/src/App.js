import React from 'react';
import './App.scss';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';

class App extends React.Component {
  render() {
    return (
      <div>
        {/* <Header/> */}
        <Main/>
        <Footer/>
      </div>
    ); 
  }
}

export default App;
