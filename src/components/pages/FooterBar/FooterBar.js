import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from 'axios';
import "./public/FooterBar.css";

function FooterBar(props) { 
  return (
    <>
    <footer class="footer">
        <div class="footer__addr">
          <h1 class="footer__logo">오늘의 칵테일</h1>
          <h2>Contact</h2>
          <address>[30019] 세종특별자치시 세종로 고려대학교 세종캠퍼스 과학기술2관 314호<br/>
            <a class="footer__btn" href="mailto:tykimdrea@korea.ac.kr">Email Us</a>
          </address>
        </div>
        
        <ul class="footer__nav">

          <li class="nav__item nav__item--extra">
            <h2 class="nav__title">개발자 소개</h2>
            
            <ul class="nav__ul nav__ul--extra">
              <li>
                <span>
                    김효민<br/>
                    <a href = "https://sejong.korea.ac.kr/mbshome/mbs/software/index.do">고려대학교 컴퓨터정보학과</a><br/>
                    rlagyalsdlek@korea.ac.kr
                </span>
              </li>
              <li>
                <a href="https://www.instagram.com/kim_pikan/">@min_97</a></li>
            </ul>
          </li>

          <li class="nav__item nav__item--extra">
            <h2 class="nav__title"><br/></h2>
            
            <ul class="nav__ul nav__ul--extra">
              <li>
                <span>
                    김지환<br/>
                    <a href = "https://sejong.korea.ac.kr/mbshome/mbs/software/index.do">고려대학교 컴퓨터정보학과</a><br/>
                    tykimdream@korea.ac.kr</span>
              </li>
              <li>
                <a href="https://www.instagram.com/kim_pikan/">@kim_pikan</a></li>
            </ul>
          </li>
          
          <li class="nav__item">
            <h2 class="nav__title">Legal</h2>
            
            <ul class="nav__ul">
              <li>
                <a href="https://policy.naver.com/policy/service.html">Privacy Policy</a>
              </li>
              
              <li>
                <a href="https://policy.naver.com/policy/search_policy.html">Terms of Use</a>
              </li>
              
              <li>
                <a href="https://policy.naver.com/policy/disclaimer.html">Sitemap</a>
              </li>
            </ul>
          </li>
        </ul>
        
        <div class="legal">
          <p>&copy; 2021 오늘의칵테일. All rights reserved.</p>
          
          <div class="legal__links">
            <span>Made for <span class="heart">IoT Web Programming</span></span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default withRouter(FooterBar);
