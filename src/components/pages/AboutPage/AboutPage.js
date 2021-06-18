import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from 'axios';
import "./public/AboutPage.css";

function About() {
    const [Cocktail, setCocktail] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/about')
        .then(res => {
            setCocktail(res.data);
        })
        .catch(err => console.log(err))
    }, [])
     

    return (
    <>
        <main>
            <div>
                <div class = "about_page">이 페이지는 고려대학교 세종캠퍼스 2021년 1학기 IoT 웹프로그래밍 실습 프로젝트로 제작된 페이지입니다.
                </div>

                <div class = "subtitle">우리 페이지의 목적</div>
           
                <ul class = "for">
                    <li>쉽고 빠르게 칵테일을 고르고 싶은 사람을 위해</li>
                    <li>어떤 느낌의 칵테일을 찾고 싶은 사람을 위해</li>
                    <li>칵테일의 역사와 레시피를 알고 싶은 사람을 위해</li>
                    <li>사람들에게 인기가 많은 칵테일을 알고 싶은 사람을 위해</li>
                    <li>오늘 가장 잘 나가는 칵테일을 알고 싶은 사람을 위해</li>
                </ul>

                <div class = "subtitle">개발자 소개</div> 
                <div class = "deve">
                    <div class = "profile">
                        <img class = "profile" src= "https://allknowledge.kr/img/posts/04/1.png" alt ="image"></img>
                    </div>
                    <div class = "career">
                        <p>김효민</p><br></br>
                        <p>고려대학교 세종캠퍼스 컴퓨터정보학과</p>
                        <p>Tel : 010-2353-****</p>
                        <p>e-mail : rlagyalsdlek@korea.ac.kr</p>
                        <p>instagram : @min_97</p>
                    </div>
                </div>
                <div class = "deve">
                    <div class = "profile">
                        <img class = "profile" src= "https://allknowledge.kr/img/posts/04/1.png" alt ="image"></img>
                    </div>
                    <div class = "career">
                        <p>김지환</p><br></br>
                        <p>고려대학교 세종캠퍼스 컴퓨터정보학과</p>
                        <p>Tel : 010-6700-****</p>
                        <p>e-mail : tykimdream@korea.ac.kr</p>
                        <p>instagram : @kim_pikan</p>
                    </div>
                </div>
                
            </div>
            
        </main>
        </>
    );
}

export default withRouter(About);
