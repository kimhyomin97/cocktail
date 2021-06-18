import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from 'axios';
import "./public/RecommendPage.css";

function RecommendPage() { 
    const [Cocktail, setCocktail] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/recommend-cocktail')
        .then(res => {
            setCocktail(res.data);
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <>
        <main>
        <div class ="recommend-temp-box recommend-box-rank_title_today">오늘의 칵테일</div>
        <div class = "recommend-sub-container"><div class = "today-hastag">전달받은 칵테일이름</div></div>
            <div class = "recommend-main-container">
                {/* <div class = "homepage-temp-box homepage-box-title">오늘의 칵테일</div> */}                
                {Cocktail.map((list, cnt=0) => {
                    cnt++
                    if(cnt<=6){
                        return(
                        <div class = {"recommend-temp-box recommend-box-rank"+cnt}>
                            {console.log(list.img)}
                            <div><a href={"/cocktail/" + list.name}><img src={list.image} className={"img"+cnt}/></a></div>
                            <div>{list.name}</div>
                            <div>{'# ' + list.hash1 +', '+ '# ' + list.hash2 +', '+ '# ' + list.hash3}</div>
                            <div>good : {list.good}  bad : {list.bad}</div>
                        </div>
                        )
                    }
                })}
                <div class = "recommend-temp-box recommend-box-rank">칵테일1</div>
                <div class = "recommend-temp-box recommend-box-rank">칵테일2</div>
                <div class = "recommend-temp-box recommend-box-rank">칵테일3</div>
                <div class = "recommend-temp-box recommend-box-rank">칵테일1</div>
                <div class = "recommend-temp-box recommend-box-rank">칵테일1</div>
                <div class = "recommend-temp-box recommend-box-rank">칵테일1</div>
                <div class = "recommend-temp-box recommend-box-rank">칵테일1</div>
            </div>
        </main>
        </>
    );
}

export default withRouter(RecommendPage);
