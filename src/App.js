// import logo from './logo.svg';
// import './App.css';
import LandingPage from './components/pages/LandingPage/LandingPage';
import React, { useState, useEffect } from 'react';

import axios from 'axios';

function App() {
  // const [test, setTest] = useState({
  //   bad: '',
  //   cocktail: '',
  //   good: '',
  //   hastag: '',
  //   history: '',
  //   image: '',
  //   recipe: ''
  // });

  // const [testData, setTestData] = useState();
  // const [good, setGood] = useState();
  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/get')
  //     .then(res => {
  //       console.log(res)
  //       console.log(res.data)
  //       console.log(res.data[0])
  //       setTestData(res.data[0].cocktail)
  //       setGood(res.data[0].good)
  //     })
  //     // .then(res => setTest(res.data))
  //     .catch(err => console.log(err))
  // })
  // console.log(testData)
  
  return (
    <>
    <LandingPage></LandingPage>
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       git test
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
