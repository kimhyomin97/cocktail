import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from 'axios';
import "./public/DisplayCocktail.css";

function DisplayCocktail({ match }) {
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
  const [keyname, setKeyword] = useState();
  const [Cocktail, setCocktail] = useState([]);
  const [post, setPost] = useState(0);
  const [search_result, setResult] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/get')
      .then(res => {
        setCocktail(res.data)
      })
      .catch(err => console.log(err))
  },[])

  useEffect(() => {
    axios.post('http://localhost:5000/api/keyword', {searchname:keyname})
      .then(res => {    // 칵테일 이름을 통해 검색을 할 때 서버에서 처리해준다
        setResult(res.data);    // name을 전송하면 검색된 결과를 리턴받는다
      })
      .catch(err => console.log(err))
  },[post])
  
  const keywordChange = ({target: {value}}) => setKeyword(value);
  // 키보드 입력 이벤트를 감지해서 keyword state를 업데이트 해준다

  var material_list = material;
  var intro_list = intro;

  return (
    <>
    <main>
    <h1 class = "recent-post-title">Cocktail List</h1>
    <div className="list_search">
        <input type="text" onChange={keywordChange}></input>
        <input type="submit" value="검색" onClick={() => setPost(post+1)}/>
    </div>
    {keyname==null ?
    Cocktail?.map(list => {
        return(
            <>
            <div class = "licontent clearfix">
            <div class = "main-content">

                <div class = "post">
                    <a href = {"/cocktail/" + list.name} className="display-img-container"><img src = {list.image} alt = "" class = "post-image" /></a>
                    <div class = "post-preview">
                    <div class = "post-cockname">{list.name}</div><br/>
                    <div class = "post-material"> {list.material.split('\\rr').map(text => {
                        return(
                            <>
                            {text}
                            <br/>
                            </>
                        )
                    })}</div>
                    <a href = {"/cocktail/" + list.name} class = "btn get-more">Get More</a>
                    </div>
                </div>
            </div>
            </div>
            </>
        )
    }) :
    search_result.map(list => {
        return(
            <>
            <div class = "licontent clearfix">
            <div class = "main-content">

                <div class = "post">
                    <a href = {"/cocktail/" + list.name} className="display-img-container"><img src = {list.image} alt = "" class = "post-image" /></a>
                    <div class = "post-preview">
                    <div class = "post-cockname">{list.name}</div><br/>
                    <div class = "post-material"> {list.material.split('\\rr').map(text => {
                        return(
                            <>
                            {text}
                            <br/>
                            </>
                        )
                    })}</div>
                    <a href = {"/cocktail/" + list.name} class = "btn get-more">Get More</a>
                    </div>
                </div>
            </div>
            </div>
            </>
        )
    })}
    </main>

    </>
  );
}

export default withRouter(DisplayCocktail);
