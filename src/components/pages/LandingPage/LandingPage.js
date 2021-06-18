import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "./public/LandingPage.css";

function LandingPage(props) {
  // const hashList = ["휴양지", "부드러운", "남녀노소", "색감이매력적인", "상큼한"
  //                 ,"열대과일", "여름", "감칠맛나는", "휴양지", "적당한알콜"
  //                 ,"여름", "식전주", "간단한", "달콤한", "청량감"
  //                 ,"쌉쌀한", "알코올이강한", "카페에서", "가벼운", "꿀이들어간",
  //                 ,"고급스러운", "묵직한", "최고의칵테일", "다양성의존중"];
  const [hashList, setHashList] = useState([[]]);

  useEffect(() => {   // axios 통신을 사용해 node.js로 작성한 서버에 연결
    axios.get('http://localhost:5000/api/landing')
    .then(res => {
      setHashList(res.data);  // 해시태그 리스트를 데이터베이스에서 갖고온다
    })
  },[])

  const hash_list = [];
  const set_hash = hashList.map(hash => {   // axios통신으로 읽어온 해시태그 정보중에서
                                            // 중복된 태그들을 제거해주는 코드
    for(var i=1;i<=3;i++){                  // 칵테일당 3개의 해시태그가 있기 때문에
      hash_list.push(hash[`hash${i}`]);     // 반복문을 통해 하나의 리스트에 넣어준 뒤
    }                                       // Set함수를 활용해서 중복된 값들을 제외해준 다음
  })                                        // 배열과 map함수를 활용해서 DOM을 생성해 뿌려줍니다.
  const hash_set = new Set(hash_list);
  const hash_distinct = [...hash_set];

  const rend_hash = hash_distinct.map((hash) => (
    <Link to={'/hashtag2/'+hash}><div className = "hash-box"># {hash}</div></Link>)
  );
  
  return (
    <>
    <div className="land_body">
    <div className = "today_cocktail_title">#오늘의 칵테일</div>
    <div className = "today_cocktail_subtitle">#해시태그를 클릭하세요</div>
    <div className = "hash-main-container">
      {rend_hash}
    </div>
    <br/>
    </div>
    </>
  );
}

export default LandingPage;
