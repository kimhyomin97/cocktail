import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { withRouter } from "react-router-dom";

import "./public/RankPage.css";

function RankPage({match}) {
  const [testData, setTestData] = useState();
  const [name, setName] = useState();
  const [name_es, setName_es] = useState();
  const [good, setGood] = useState();
  const [bad, setBad] = useState();
  const [material, setMaterial] = useState();
  const [recipe, setRecipe] = useState();
  const [intro, setIntro] = useState();
  const [img, setImg] = useState();
  
  const cocktail_name = match.params.name;

  const hashList = ["테스트1", "테스트2", "테스트3", "테스트4", "테스트5"];
  
  var name_temp;

  useEffect(() => {

    axios.post('http://localhost:5000/api/search_name', {name : cocktail_name})
    .then(res => {
        console.log(res.data)
        setName(res?.data[0].name)
        setName_es(res?.data[0].name_es)
        setGood(res?.data[0].good)
        setBad(res?.data[0].bad)
        setMaterial(res?.data[0].material)
        setRecipe(res?.data[0].recipe)
        setIntro(res?.data[0].intro)
        setImg(res?.data[0].image)
    })
    })
  var material_list = material;
  var intro_list = intro;
  return (
    <>
    <main>
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
        </div>
        </main>
    </>
  );
}
export default withRouter(RankPage);
