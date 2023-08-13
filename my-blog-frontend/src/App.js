import React, {Component} from 'react';
import './App.css';
import HomePage from './page/HomePage';
import About from './page/About';
import Articlelist from './page/Articlelist';
import ArticlePage from './page/ArticlePage';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import articleContent from './page/article-content';

// HERE WE HAVE TO CALL HOME PAGE COMPONEBT

class App extends Component{
  render(){
    return(
      <Router>
        <div className='App'>
        <NavBar/>
        
          <Routes>
            
            <Route path='/' element={<HomePage/>} exact/>
            <Route path='/about' element={<About/>} />
            <Route path='/articlelist' element={<Articlelist articles = {articleContent}/>} />
            <Route path="/article/:name" element={<ArticlePage />} />
          </Routes>
          <Footer/>
        </div>
      </Router>
      // <Router>
      //   <div className='App'>
      //     <Route path='/' Component={HomePage} exact/>
      //   </div>
      // </Router>
    );
  }
}
  

export default App;
