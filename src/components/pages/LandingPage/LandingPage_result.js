import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from 'axios';
import "./public/LandingPage.css";

function LandingPage_result({ match }) {     // match와 props를 통해 컴포넌트 사이에 변수를 넘겨받는다
  var tagList = match.params.tag.split(','); // url의 match를 활용해 넘겨준 태그값을 split해서 저장한다

  const [name, setName] = useState();
  const [name_es, setName_es] = useState();
  const [good, setGood] = useState();
  const [bad, setBad] = useState();
  const [material, setMaterial] = useState();
  const [recipe, setRecipe] = useState();
  const [intro, setIntro] = useState();
  const [img, setImg] = useState();
  const [hash, setHash] = useState();

  
  useEffect(() => {
    axios.post('http://localhost:5000/api/result', {tag1 : tagList[0], tag2 : tagList[1], tag3 : tagList[2]})
    .then(res => {                                // 서버측에 태그를 넘겨주고
        setName(res?.data[0]?.name)               // 해당 태그에 매칭되는 칵테일을 검색해 리턴해줍니다
        setName_es(res?.data[0]?.name_es)         // 이때 state에 칵테일 정보를 저장하는데
        setGood(res?.data[0]?.good)               // setState를 사용해 상태정보를 갱신합니다
        setBad(res?.data[0]?.bad)                 // useEffect를 사용해 state정보에 변화가 있으면
        setMaterial(res?.data[0]?.material)       // axios로 서버와 통신을 주고받는 방법을 활용했습니다.
        setRecipe(res?.data[0]?.recipe)
        setIntro(res?.data[0]?.intro)             // 추천받은 칵테일에 대한 good bad를 저장하기 위해
        setImg(res?.data[0]?.image)               // today 정보까지 서버에 넘겨주어 DB에 저장해줍니다.
        setHash(res.data[0]?.hash1 +','+ res.data[0]?.hash2 +','+res.data[0]?.hash3);    
    })
    
  },[])
  useEffect(()=>{
    axios.post('http://localhost:5000/api/result_good', {name : name, good : good})
    .then(res => {})
  },[good])

  useEffect(()=>{
    axios.post('http://localhost:5000/api/result_bad', {name : name, bad : bad})
    .then(res => {})
  },[bad])

  useEffect(()=>{
    axios.post('http://localhost:5000/api/result_today_good', {tag1 : tagList[0], tag2 : tagList[1], tag3: tagList[2], good : good})
    .then(res => {})
  },[good])

  useEffect(()=>{
    axios.post('http://localhost:5000/api/result_today_bad', {tag1 : tagList[0], tag2 : tagList[1], tag3: tagList[2], bad : bad})
    .then(res => {})
  },[bad])
  
  useEffect(()=>{
    axios.post('http://localhost:5000/api/result_create1', {tag1:tagList[0], tag2:tagList[1], tag3:tagList[2]})
    .then(res => {})
  },[good])

  useEffect(()=>{
    axios.post('http://localhost:5000/api/result_create2', {tag1:tagList[0], tag2:tagList[1], tag3:tagList[2]})
    .then(res => {})
  },[good])

  useEffect(()=>{
    axios.post('http://localhost:5000/api/result_create3', {tag1:tagList[0], tag2:tagList[1], tag3:tagList[2]})
    .then(res => {})
  },[good])
  
  var material_list = material;

  const good_bt = () => {
      setGood(good+1);
  }
  const bad_bt = () => {
    setBad(bad+1);
    }

  return (
    <>
    <main>
        <div class = "land-main-container">
            <div class = "land-temp-box land-box-rank_title">#오늘의 칵테일</div>
            {hash?.split(',').map((text, cnt=0) => {
                cnt++;
                return (
                    <div class = {"land-temp-box land-box-tag"+cnt}># {text}</div>
                )
            })}
            <div class = "land-temp-box land-box-img"><a href={"/cocktail/"+name}><img className="cocktail_img" src={img} /></a></div>
            <div class = "land-temp-box land-box-name"><div>{name} {name_es}</div></div>
            
            <div class = "land-temp-box land-box-info-title">Recipe</div>
            <div class = "land-temp-box land-box-info">{material_list?.split('\\rr').map((text) => {
                return (
                    <span>
                        {text}
                        <br/>
                    </span>
                )
            })}</div>
            <div class = "land-temp-box land-box-decision-text">만족하시면 Good, 별로거나 원하시던 칵테일이 아니면 Bad를 눌러주세요</div>
            <div class = "land-temp-box land-box-decision-good"><a href="/homepage" onClick={()=>{good_bt()}}>Good</a></div>
            <div class = "land-temp-box land-box-decision-bad"><a href="/homepage" onClick={()=>{bad_bt()}}>Bad</a></div>
            <div class = "land-temp-box land-box-decision-result-text">(누르면 홈페이지로 이동합니다.)</div>
           
        </div>
    </main>
    </>
  );
}

export default withRouter(LandingPage_result);
