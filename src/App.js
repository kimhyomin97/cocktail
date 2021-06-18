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
  // 메인 웹 서버를 실행하는 코드
  // 라우터를 통해 각 컴포넌트의 주소값을 설정해주고, header와 footer를 출력해준다
  // 웹페이지를 제작할 때 가장 기본이 되는 부분
  return (
    <BrowserRouter>
    <HeaderBar />
      <Route exact path="/" component={LandingPage}/>
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
