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

  // setHashtagList("테스트1", "테스트2", "테스트3", "테스트4", "테스트5");
  const hashList = ["테스트1", "테스트2", "테스트3", "테스트4", "테스트5"];
  
  var name_temp;

  useEffect(() => {
    // axios.get('http://localhost:5000/api/get')
    //   .then(res => {
    //     // console.log(res)
    //     // console.log(res.data)
    //     // console.log(res.data[1])
    //     // name_temp = res.data[1].name.split('\\rr');
    //     setTestData(res.data[1].name)
    //     // setGood(res.data[1].good)
    //     // setInfo(res.data[1].recipe)
    //     // setImg(res.data[1].image)
    //     setName(res.data[1].name)
    //     setName_es(res.data[1].name_es)
    //     setGood(res.data[1].good)
    //     setBad(res.data[1].bad)
    //     setMaterial(res.data[1].material)
    //     setRecipe(res.data[1].recipe)
    //     setIntro(res.data[1].intro)
    //     setImg(res.data[1].image)
    //   })
    //   // .then(res => setTest(res.data))
    //   .catch(err => console.log(err));

    axios.post('http://localhost:5000/api/search_name', {name : cocktail_name})
    .then(res => {
        // console.log(res.data)
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
    useEffect(()=>{
        axios.post('http://localhost:5000/api/comment', {name : cocktail_name})
        .then(res => {
            // console.log(res.data);
            setComment(res.data);
        })
    },[])
    useEffect(()=>{
        axios.post('http://localhost:5000/api/comment_post', {name : cocktail_name, id : id, pw : pw, comment_article : article})
        .then(res => {
            // console.log(res.data);
            // setComment(res.data);
            
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
            {/* <div class ="temp-box box-logo">
            logo</div>
            <div class ="temp-box box-title">오늘의 칵테일</div> */}
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
                {/* ID : <br/>PW : <br/>입력창 */}
                <form>
                    I D : <input type="text" placeholder="아이디" onChange={idChange} autocomplete="nope"></input><br/>
                    Pw : <input type="password" placeholder="비밀번호" onChange={pwChange}></input><br/>                
                    댓글입력 : <textarea className = "comment_input_area" type="text" placeholder="댓글 입력" onChange={articleChange}></textarea><br/>
                    {/* <input type="submit" onClick={() => setPost(post+1)}>입력</input> */}
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
    {/* <div className = "today_cocktail_title">#오늘의 칵테일</div>
    <div className = "today_cocktail_subtitle">#해시태그를 클릭하세요</div>
    <div className = "hash_list_container">
    
      
    </div>
    <br/>
    <img src={img} />
    <div>{name}</div>
    <div>{good}</div>
    <div>{bad}</div>
    <div>{temp?.split('\\rr').map((text) => {
        return (
            <span>
                {text}
                <br/>
            </span>
        )
    })}
    </div>
    <div>{recipe?.split('\\rr').map((text) => {
        return (
            <span>
                {text}
                <br />
            </span>
        )
    })}</div>
    <div>{intro}</div> */}
    </>
  );
}

export default withRouter(CocktailPage);
