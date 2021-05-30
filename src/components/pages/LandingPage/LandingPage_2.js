import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from 'axios';
import "./public/LandingPage.css";

function LandingPage_2({ match }) { 
  const hashList = ["휴양지", "부드러운", "남녀노소", "색감이매력적인", "상큼한"
                  ,"열대과일", "여름", "감칠맛나는", "휴양지", "적당한알콜"
                  ,"여름", "식전주", "간단한", "달콤한", "청량감"
                  ,"쌉쌀한", "알코올이강한", "카페에서", "가벼운", "꿀이들어간",
                  ,"고급스러운", "묵직한", "최고의칵테일", "다양성의존중"];
 
  const tag1 = match.params.tag1;

  const [test, setTest] = useState();

  // console.log(match.path);

  useEffect(() => {
    // axios.get('http://localhost:5000/api/get')
    //   .then(res => {
    //     console.log(res)
    //     console.log(res.data)
    //     console.log(res.data[0])
    //     setTestData(res.data[0].cocktail)
    //     setGood(res.data[0].good)
    //   })
    //   // .then(res => setTest(res.data))
    //   .catch(err => console.log(err))
    axios.post('http://localhost:5000/api/search_tag1', {tag1 : tag1})
    .then(res => {
      console.log(res.data[0])
    })
  })
  
  const rend_hash = hashList.map(hash => (
    <div className = "hash_list"><Link to={'/hashtag3/'+match.params.tag1+','+hash}># {hash}</Link></div>
  ));

  return (
    <>
    <div className = "today_cocktail_title">#오늘의 칵테일</div>
    <div className = "today_cocktail_subtitle">#해시태그를 클릭하세요</div>
    <div className = "title_tag"># {match.params.tag1}</div>
    <div className = "hash_list_container">
      {rend_hash}
    </div>
    </>
  );
}

export default withRouter(LandingPage_2);
