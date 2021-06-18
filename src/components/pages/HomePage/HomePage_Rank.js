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
            // setCocktail(res.data);
            // console.log(res.data);
            setHash_List(res.data);
        })
        .catch(err => console.log(err))
    }, [])
    console.log(Cocktail);
    // const list_print = (tag) => {
    //     Cocktail.map(list => {
    //         if((list.hash1 == tag) || (list.hash2 == tag) || (list.hash3 == tag)){
    //             return(
    //                 <>
    //                 <div>{list.name}</div>
    //                 </>
    //             )
    //         }
    //     })
    // }
    return (
        <>
        <main>
            <div class = "homepage-main-container">
                {/* <div class = "homepage-temp-box homepage-box-title">오늘의 칵테일</div> */}
                <div class ="homepage-temp-box homepage-box-rank_title_today">실시간 칵테일 순위</div>
                {/* {Cocktail.map((list, cnt=0) => {
                    cnt++
                    if(cnt<=6){
                        return(
                        <div class = {"homepage-temp-box homepage-box-rank"+cnt}>
                            {console.log(list.img)}
                            <div><a href={"/cocktail/" + list.name}><img src={list.image} className={"img"+cnt}/></a></div>
                            <div>{list.name}</div>
                            <div>{'# ' + list.hash1 +', '+ '# ' + list.hash2 +', '+ '# ' + list.hash3}</div>
                            <div>good : {list.good}  bad : {list.bad}</div>
                        </div>
                        )
                    }
                })} */}
                {hash_list.map((list, cnt=0) => {
                    cnt++
                    if(cnt<=6){
                        return(
                            <div class = {"homepage-temp-box homepage-box-rank"+cnt}>
                                {/* <div><a href={"/cocktail/" + list.name}><img src={list.image} className={"img"+cnt}/></a></div> */}
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
                                {/* <div>{'# ' + list.hash1 +', '+ '# ' + list.hash2 +', '+ '# ' + list.hash3}</div>
                                <div>good : {list.good}  bad : {list.bad}</div> */}
                            </div>
                        )
                    }
                })}
                {/* <div class = "homepage-temp-box homepage-box-timer">time</div>
                <div class = "homepage-temp-box homepage-box-rank1">칵테일1</div>
                <div class = "homepage-temp-box homepage-box-rank2">칵테일1</div>
                <div class = "homepage-temp-box homepage-box-rank3">칵테일1</div>
                <div class = "homepage-temp-box homepage-box-rank4">칵테일1</div>
                <div class = "homepage-temp-box homepage-box-rank5">칵테일1</div>
                <div class = "homepage-temp-box homepage-box-rank6">칵테일1</div> */}
            </div>
            <div class="rank_info_text">칵테일 이름을 클릭하면 해당 페이지로 이동합니다.</div><br/>
        </main>
        </>
    );
}

export default withRouter(HomePage_Rank);
