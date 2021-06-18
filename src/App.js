// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';

import axios from 'axios';

import LandingPage from './components/pages/LandingPage/LandingPage';
import LandingPage_2 from './components/pages/LandingPage/LandingPage_2';
import LandingPage_3 from './components/pages/LandingPage/LandingPage_3';
import CocktailPage from './components/pages/CocktailPage/CocktailPage';
import LandingPage_result from './components/pages/LandingPage/LandingPage_result';
import HomePage from './components/pages/HomePage/HomePage';
import HomePage_Rank from './components/pages/HomePage/HomePage_Rank';
import FooterBar from './components/pages/FooterBar/FooterBar';
import HeaderBar from './components/pages/HeaderBar/HeaderBar';
import DisplayCocktail from './components/pages/DisplayCocktail/DisplayCocktail';
import RecommendPage from './components/pages/RecommendPage/RecommendPage';
import AboutPage from './components/pages/AboutPage/AboutPage';

function App() {
  
  return (
    <BrowserRouter>
    <HeaderBar />
      <Route exact path="/" component={LandingPage}/>
      {/* <Route exact path="/hashtag2" component={LandingPage_2}/> */}
      <Route path="/hashtag2/:tag1" component={LandingPage_2}/>
      <Route path="/hashtag3/:tag1" component={LandingPage_3}/>
      <Route exact path="/cocktail/:name" component={CocktailPage}/>
      <Route path="/result/:tag" component={LandingPage_result} />
      <Route path="/homepage" component={HomePage} />
      <Route path="/homepage_rank" component={HomePage_Rank} />
      <Route path="/display" component={DisplayCocktail} />
      <Route path="/today_cocktail" component={RecommendPage} />
      <Route path="/about" component={AboutPage} />
      <FooterBar />
    </BrowserRouter>
  );
}

export default App;
