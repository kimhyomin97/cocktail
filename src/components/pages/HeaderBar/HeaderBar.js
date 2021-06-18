import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from 'axios';
import "./public/HeaderBar.css";

function HeaderBar(props) { 
    const path = props.location.pathname;
    const temp = path.split('/');
    console.log(temp);
// console.log(props.location.pathname);
if(temp[1]=='' || temp[1]=="hashtag2" || temp[1] == "hashtag3"){
    return (<div></div>);
}
  return (
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
