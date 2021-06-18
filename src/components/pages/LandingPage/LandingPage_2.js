import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from 'axios';
import "./public/LandingPage.css";

function LandingPage_2({ match }) { 
  // const hashList = ["휴양지", "부드러운", "남녀노소", "색감이매력적인", "상큼한"
  //                 ,"열대과일", "여름", "감칠맛나는", "휴양지", "적당한알콜"
  //                 ,"여름", "식전주", "간단한", "달콤한", "청량감"
  //                 ,"쌉쌀한", "알코올이강한", "카페에서", "가벼운", "꿀이들어간",
  //                 ,"고급스러운", "묵직한", "최고의칵테일", "다양성의존중"];
 
  const tag1 = match.params.tag1;

  const [hashList, setHashList] = useState([[]]);

  useEffect(() => {
    axios.post('http://localhost:5000/api/landing2', {tag1 : tag1})
    .then(res => {            // 선택한 태그와 연관된 태그를 출력하기 위해
      setHashList(res.data);  // 서버에 데이터를 요청한다
    })             // 이부분 server.js 에서 sql문이랑 같이 보여주면 좋다
  },[])

  const hash_list = [];
  const set_hash = hashList.map(hash => {

    for(var i=1;i<=3;i++){
      if(hash[`hash${i}`] == tag1 || hash[`hash${i}`] == tag1);
      else if(hash[`hash${i}`])
        hash_list.push(hash[`hash${i}`]);
    }
  })
  const hash_set = new Set(hash_list);
  const hash_distinct = [...hash_set];

  const rend_hash = hash_distinct.map(hash => (
    <Link to={'/hashtag3/'+match.params.tag1+','+hash}><div className = "hash-box"># {hash}</div></Link>
  ));

  return (
    <>
    <div className = "today_cocktail_title">#오늘의 칵테일</div>
    <div className = "today_cocktail_subtitle">#해시태그를 클릭하세요</div>
    <div className = "hash-sub-containier"><div className="hash_input"># {match.params.tag1}</div></div>
    <div className = "hash-main-container">
      {rend_hash}
    </div>
    </>
  );
}

export default withRouter(LandingPage_2);
