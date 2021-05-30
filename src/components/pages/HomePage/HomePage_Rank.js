import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from 'axios';
import "./public/HomePage.css";

function HomePage_Rank() { 

  return (
    <>
    <main>
        <div class = "homepage-main-container">
            <div class ="homepage-temp-box homepage-box-logo">logo</div>
            <div class = "homepage-temp-box homepage-box-title">오늘의 칵테일</div>
            <div class ="homepage-temp-box homepage-box-rank_title_today">실시간 칵테일 순위</div>
            <div class = "homepage-temp-box homepage-box-timer">time</div>
            <div class = "homepage-temp-box homepage-box-rank1">칵테일1</div>
            <div class = "homepage-temp-box homepage-box-rank2">칵테일1</div>
            <div class = "homepage-temp-box homepage-box-rank3">칵테일1</div>
            <div class = "homepage-temp-box homepage-box-rank4">칵테일1</div>
            <div class = "homepage-temp-box homepage-box-rank5">칵테일1</div>
            <div class = "homepage-temp-box homepage-box-rank6">칵테일1</div>
        </div>
    </main>
    </>
  );
}

export default withRouter(HomePage_Rank);
