import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { withRouter } from "react-router-dom";

import "./public/CocktailPage.css";

function CocktailPage({match}) {
  const [testData, setTestData] = useState();
  const [name, setName] = useState();
  const [name_es, setName_es] = useState();
  const [good, setGood] = useState();
  const [bad, setBad] = useState();
  const [material, setMaterial] = useState();
  const [recipe, setRecipe] = useState();
  const [intro, setIntro] = useState();
  const [img, setImg] = useState();

  const [Comment, setComment] = useState([]);

  const [id, setId] = useState();
  const [pw, setPw] = useState();
  const [article, setArticle] = useState();
  const [post, setPost] = useState(0);

  const cocktail_name = match.params.name;
  
  useEffect(() => {
    axios.post('http://localhost:5000/api/search_name', {name : cocktail_name})
    .then(res => {                          // 칵테일 이름을 서버에 전송해서
        setName(res?.data[0].name)          // 칵테일 정보를 서버로부터 받아옵니다.
        setName_es(res?.data[0].name_es)
        setGood(res?.data[0].good)
        setBad(res?.data[0].bad)
        setMaterial(res?.data[0].material)
        setRecipe(res?.data[0].recipe)
        setIntro(res?.data[0].intro)
        setImg(res?.data[0].image)
    })
    })
    useEffect(()=>{
        axios.post('http://localhost:5000/api/comment', {name : cocktail_name})
        .then(res => {                      // 댓글을 comment 테이블에서 갖고옵니다.
            setComment(res.data);
        })
    },[])
    useEffect(()=>{
        axios.post('http://localhost:5000/api/comment_post', {name : cocktail_name, id : id, pw : pw, comment_article : article})
        .then(res => {
        })
    },[post])
  var material_list = material;
  var intro_list = intro;

  console.log(post)

  const articleChange = ({target: {value}}) => setArticle(value);
  const idChange = ({target: {value}}) => setId(value);
  const pwChange = ({target: {value}}) => setPw(value);

  return (
    <>
    <main>
    <div class = "main-container">
            <div class = "temp-box box-comment">
                {Comment?.map(text => {
                    return(
                        <>
                        <div><span className="comment_name">{text.name}</span> - {text.article}</div>
                        <br/>
                        </>
                    )
                })}
            </div>
            <div class = "temp-box box-comment_input">
                <form>
                    I D : <input type="text" placeholder="아이디" onChange={idChange} autocomplete="nope"></input><br/>
                    Pw : <input type="password" placeholder="비밀번호" onChange={pwChange}></input><br/>                
                    댓글입력 : <textarea className = "comment_input_area" type="text" placeholder="댓글 입력" onChange={articleChange}></textarea><br/>
                    <input className = "comment_input_button" type="submit" value="입력" onClick={() => setPost(post+1)}/>
                </form>
            </div>
            <div class = "temp-box box-img"><img className="cocktail_img" src={img} /></div>
            <div class = "temp-box box-cocktil_name"><div>{name} ({name_es})</div></div>
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
                return (   // 재료정보를 \\rr문자를 기준으로 개행처리를 해준 다음 출력을 해줍니다.
                    <span>                         
                        {text}
                        <br/>
                    </span>
                )
            })}
            </div></div>
            <div class = "temp-box box-recipe">{recipe?.split('\\rr').map((text)=>{                     
                return (   // 레시피정보를 전처리 해주고 class를 통해 스타일을 더해줍니다.
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

export default withRouter(CocktailPage);
