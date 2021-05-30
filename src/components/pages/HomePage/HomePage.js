import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from 'axios';
import "./public/HomePage.css";

function HomePage() {
    const [Cocktail, setCocktail] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/homepage')
        .then(res => {
            setCocktail(res.data);
        })
        .catch(err => console.log(err))
    }, [])
    
    console.log(Cocktail)
    return (
    <>
        <main>
            <div class = "homepage-main-container">
                {/* <div class ="homepage-temp-box homepage-box-logo">logo</div>
                <div class = "homepage-temp-box homepage-box-title">오늘의 칵테일</div> */}
                <div class ="homepage-temp-box homepage-box-rank_title">칵테일 순위</div>
                {Cocktail.map((list, cnt=0) => {
                    cnt++
                    if(cnt<=6){
                        return(
                        <div class = {"homepage-temp-box homepage-box-rank"+cnt}>
                            {console.log(list.img)}
                            <div><a href={"/cocktail/" + list.name}><img src={list.image} className={"img"+cnt}/></a></div>
                            <div>{list.name}</div>
                            <div>{list.hash1 +', '+ list.hash2 +', '+ list.hash3}</div>
                            <div>{list.good}, {list.bad}</div>
                        </div>
                        )
                    }
                })}
            </div>
            
        </main>
        </>
    );
}

export default withRouter(HomePage);
