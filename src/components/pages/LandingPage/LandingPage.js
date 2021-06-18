import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "./public/LandingPage.css";
import LandingPage_2 from './LandingPage_2';
import test_img from './public/test2.png';

function LandingPage(props) {
  const [testData, setTestData] = useState();
  const [good, setGood] = useState();
  const [hashtag ,setHashtag] = useState();
  const [info, setInfo] = useState();
  const [img, setImg] = useState();

  // console.log(props.match.path);

  // const hashList = ["휴양지", "부드러운", "남녀노소", "색감이매력적인", "상큼한"
  //                 ,"열대과일", "여름", "감칠맛나는", "휴양지", "적당한알콜"
  //                 ,"여름", "식전주", "간단한", "달콤한", "청량감"
  //                 ,"쌉쌀한", "알코올이강한", "카페에서", "가벼운", "꿀이들어간",
  //                 ,"고급스러운", "묵직한", "최고의칵테일", "다양성의존중"];
  const [hashList, setHashList] = useState([[]]);

  useEffect(() => {
    // axios.get('http://localhost:5000/api/get')
    //   .then(res => {
    //     setGood(res.data[1].good)
    //     setInfo(res.data[1].recipe)
    //     setImg(res.data[1].image)
    //   })
    //   // .then(res => setTest(res.data))
    //   .catch(err => console.log(err))
    axios.get('http://localhost:5000/api/landing')
    .then(res => {
      setHashList(res.data);
    })
  },[])

  const hash_list = [];
  const set_hash = hashList.map(hash => {

    for(var i=1;i<=3;i++){
      hash_list.push(hash[`hash${i}`]);
    }
  })
  const hash_set = new Set(hash_list);
  const hash_distinct = [...hash_set];

  // const rend_hash = hash_distinct.map((hash) => (
  //   <div className = "hash_list"><Link to={'/hashtag2/'+hash}># {hash}</Link></div>)
  // );
  const rend_hash = hash_distinct.map((hash) => (
    <Link to={'/hashtag2/'+hash}><div className = "hash-box"># {hash}</div></Link>)
  );
  
  return (
    <>
    <div className = "today_cocktail_title">#오늘의 칵테일</div>
    <div className = "today_cocktail_subtitle">#해시태그를 클릭하세요</div>
    {/* <div className = "hash_list_container"> */}
    <div className = "hash-main-container">
      {rend_hash}
    </div>
    <br/>
    <div><a>테스트</a></div>
    </>
  );
}

export default LandingPage;
