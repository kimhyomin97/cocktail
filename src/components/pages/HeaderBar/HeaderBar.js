import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from 'axios';
import "./public/HeaderBar.css";

function HeaderBar(props) {              // Header를 출력하는 컴포넌트를 제작했습니다.
    const path = props.location.pathname;// 이때 헤더가 출력되지 않는 부분의 path를 지정하여
    const temp = path.split('/');        // 조건문을 통해 선택적으로 헤더를 출력했습니다.
    console.log(temp);
if(temp[1]=='' || temp[1]=="hashtag2" || temp[1] == "hashtag3"){
    return (<div></div>);
}
  return (                               // 시맨틱태그인 header를 활용했습니다.
    <>
    <header>                             
        <div class = "logo">
            <a className = "logo_a" href="/homepage"><h1 class = "logo-text"><span>오늘의</span> 칵테일</h1></a>
        </div>
        <i class = "fa fa-bars menu-toggle">ssdd</i>
        <ul class = "nav">
            <li><a href="/homepage">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li>
                <a className = "mouse-margin" href="#">Services</a>
                <ul className = "header_list">
                    <li><a href ="/homepage">칵테일 순위</a></li>
                    <li><a href ="/homepage_rank">오늘의 순위</a></li>
                    <li><a href ="/">칵테일 추천</a></li>
                    <li><a href ="/display">칵테일 리스트</a></li>
                </ul>
            </li>
        </ul>
    </header>
    </>
  );
}

export default withRouter(HeaderBar);
