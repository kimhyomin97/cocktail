import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from 'axios';
import "./public/LandingPage.css";

function LandingPage_result({ match }) { 
  const hashList = ["휴양지", "부드러운", "남녀노소", "색감이매력적인", "상큼한"
                  ,"열대과일", "여름", "감칠맛나는", "휴양지", "적당한알콜"
                  ,"여름", "식전주", "간단한", "달콤한", "청량감"
                  ,"쌉쌀한", "알코올이강한", "카페에서", "가벼운", "꿀이들어간",
                  ,"고급스러운", "묵직한", "최고의칵테일", "다양성의존중"];

  var tagList = match.params.tag.split(',');

  const [testData, setTestData] = useState();
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
    axios.post('http://localhost:5000/api/result', {tag1 : tagList[0], tag2 : tagList[1], tag3 : tagList[2]})
    .then(res => {
        // console.log(res.data[0]);
        setName(res?.data[0]?.name)
        setName_es(res?.data[0]?.name_es)
        setGood(res?.data[0]?.good)
        setBad(res?.data[0]?.bad)
        setMaterial(res?.data[0]?.material)
        setRecipe(res?.data[0]?.recipe)
        setIntro(res?.data[0]?.intro)
        setImg(res?.data[0]?.image)
        setHash(res.data[0]?.hash1 +','+ res.data[0]?.hash2 +','+res.data[0]?.hash3);
    
    })
    
  },[])
  useEffect(()=>{
    axios.post('http://localhost:5000/api/result_good', {name : name, good : good})
    .then(res => {
        // console.log(res.data)
    })
  },[good])

  useEffect(()=>{
    axios.post('http://localhost:5000/api/result_bad', {name : name, bad : bad})
    .then(res => {
        // console.log(res.data)
    })
  },[bad])
  
  var material_list = material;
  var intro_list = intro;

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
            <div class = "land-temp-box land-box-img"><img className="cocktail_img" src={img} /></div>
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
    {/* <div className = "today_cocktail_title">#오늘의 칵테일</div>
    <div className = "today_cocktail_subtitle">#해시태그를 클릭하세요</div>
    {tagList.map((text)=> (<span className = "title_tag"># {text} </span>))}
    <div class = "main-container">
            <div class ="temp-box box-logo">logo</div>
            <div class ="temp-box box-title">오늘의 칵테일</div>
            <div class = "temp-box box-comment">댓글창</div>
            <div class = "temp-box box-comment_input">ID : <br/>PW : <br/>입력창</div>
            <div class = "temp-box box-img"><img className="cocktail_img" src={img} /></div>
            <div class = "temp-box box-cocktil_name"><div>{name}</div><div>{name_es}</div></div>
            <div class = "temp-box box-info"><div>{intro_list?.split('\\rr').map((text) => {
                return (
                    <span>
                        {text}
                        <br/>
                    </span>
                )
            })}
                </div></div>
            <div class = "temp-box box-detail_title">재료</div>
            <div class = "temp-box box-detail"><div>{material_list?.split('\\rr').map((text) => {
                return (
                    <span>
                        {text}
                        <br/>
                    </span>
                )
            })}
            </div></div>
            <div class = "temp-box box-recipe">{recipe?.split('\\rr').map((text)=>{
                return (
                    <span>
                        {text}
                        <br />
                    </span>
                )
            })}</div>
        </div> */}
    </>
  );
}

export default withRouter(LandingPage_result);
