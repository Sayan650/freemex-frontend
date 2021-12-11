import "./landing.css";
import TypeWriterEffect from "react-typewriter-effect";
// import app from "../../setupProxy";
 import { Link } from "react-router-dom";
//  import {useCallback } from "react";


function LandingSection() {

  //  const submit = (e) => {
  //   e.preventDefault();
  //       fetch('/auth/google',{
  //           method: 'GET',
  //           headers:{
  //               Accept: 'application/json',
  //               "Content-Type": 'application/json'
  //           }
  //       }).then((res)=>{
  //           res.json().then((data)=>{console.log(data)})
  //       }).catch((err)=>{console.log(err)})
  //   }
  return (
    <>
      <div className="landingPage">
        <div className="landing">
          <div className="landingWrapper">
            <div className="landingIllustration">
              <img src="Images/illustration.png" alt="" />
            </div>
            <div className="Logo">
              <img src="Images/logo.png" alt="" />
            </div>
            <TypeWriterEffect
              // textStyle={{ fontFamily: "Red Hat Display" }}
              startDelay={100}
              cursorColor="orange"
              text="NASDAQ Timings:8PM - 2:30AM"
              typeSpeed={150}
            />
            <div className="auth">
          <a href="/auth/google">
              <img src="Images/googlewhite.png" alt=""/></a>
              <img src="Images/github.png" alt="" />
            </div>
          </div>
          <div className="landingIllustration2">
            <img src="Images/illustration.png" alt="" />
          </div>
        </div>
      </div>
      <div className="about">
        <h3>
          <img src="Images/logo.png" alt="" />
          is an online trading game which allows you to buy and sell stocks at
          your convenience and at the current market price. The player at the
          end with highest total stocks and cash wins the game.
        </h3>
      </div>
      <div className="notes">
        <h1>Note</h1>
        <div className="notesWrapper">
          <ul>
            <li>Stock prices are updated every 30 seconds.</li>
            <li>Leaderboard is updated every minute.</li>
            <li>
              You may notice some after hour fluctuations in stock prices which
              are normal.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default LandingSection;
