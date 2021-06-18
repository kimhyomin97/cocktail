import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from 'axios';
import "./public/HomePage.css";

function HomePage_Rank() { 
    const [Cocktail, setCocktail] = useState([]);
    const [hash_list, setHash_List] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/homepage')
        .then(res => {
            setCocktail(res.data);
        })
        .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        axios.get('http://localhost:5000/api/homepage_rank')
        .then(res => {
            setHash_List(res.data);
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <>
        <main>
            <div class = "homepage-main-container">
                <div class ="homepage-temp-box homepage-box-rank_title_today">실시간 칵테일 순위</div>
                {hash_list.map((list, cnt=0) => {
                    cnt++
                    if(cnt<=6){
                        return(
                            <div class = {"homepage-temp-box homepage-box-rank"+cnt}>
                                <div className={"rank_title_name"}>{cnt+"."}&emsp;&emsp;# {list.hashtag}</div><br/>
                                <ul className="rank_cocktail_list">
                                {Cocktail.map(cocktail => {
                                    if((cocktail.hash1 == list.hashtag) || (cocktail.hash2 == list.hashtag) || (cocktail.hash3 == list.hashtag)){
                                        return(
                                            <>
                                            <li><a href={"/cocktail/"+cocktail.name}><div>{cocktail.name}</div></a><br/></li>
                                            </>
                                        )
                                    }
                                })}
                                </ul>
                            </div>
                        )
                    }
                })}
            </div>
            <div class="rank_info_text">칵테일 이름을 클릭하면 해당 페이지로 이동합니다.</div><br/>
        </main>
        </>
    );
}

export default withRouter(HomePage_Rank);
