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
    
    return (
    <>
        <main>
            <div class = "homepage-main-container">
                <div class ="homepage-temp-box homepage-box-rank_title">칵테일 순위</div>
                {Cocktail ? Cocktail.map((list, cnt=0) => {
                    cnt++        // 홈페이지에서 칵테일을 출력하는 코드
                    if(cnt<=6){  // 서버를 통해 good 순으로 정렬된 배열을 리턴받고
                        return(  // map함수를 활용해 태그를 출력해준다
                        <div class = {"homepage-temp-box homepage-box-rank"+cnt}> 
                            {console.log(list.img)}
                            <div><a href={"/cocktail/" + list.name}><img src={list.image} className={"img"+cnt}/></a></div>
                            <div>{list.name}</div>
                            <div>{'# ' + list.hash1 +', '+ '# ' + list.hash2 +', '+ '# ' + list.hash3}</div>
                            <div>good : {list.good}  bad : {list.bad}</div>
                        </div>
                        )
                    }
                }) : null}
            </div>
            
        </main>
        </>
    );
}

export default withRouter(HomePage);
