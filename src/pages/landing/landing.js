import "./landing.css";
import TypeWriterEffect from "react-typewriter-effect";
import React, { useState, useEffect } from "react";
import MetaDecorator from "../../components/metaDecorator/metaDecorator";
function LandingSection() {
  const [player, setPlayer] = useState(0);
  const getPlayer = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/players`, {
      credentials: "include",
    });
    const player = await response.status;
    setPlayer(player);
    console.log(player);
  };

  useEffect(() => {
    getPlayer();
    const time = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/schedules`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();
      var current_date = new Date().getTime();
          if(result.message!== "No schedule found, please contact admin."){

      var end = new Date(result.schedule.end).getTime();
      var start = new Date(result.schedule.start).getTime();
  console.log(current_date);
      if ((current_date < start || current_date > end) && player === 200) {
        window.location.href = "/timer";
      } else if (
        (current_date >  start  || current_date < end )&&
        player === 200
      ) {
        window.location.href = "/portfolio";
      }
    }
    };
    time();
  }, [player]);

  return (
    <>
      <MetaDecorator />
      <div className="landingPage">
        <div className="landing">
          <div className="landingWrapper">
            <div className="landingIllustration">
              <img src="Images/illustration-new.png" alt="" />
            </div>
            <div className="Logo">
              <img src="Images/logo.png" alt="" />
            </div>
            {/* <div className="sponsored">
        <h2>Sponsorsed by : </h2>
        <a href="https://funstox.live/">
          <img src="Images/funstox.png" alt="" />
        </a>
      </div> */}
            <TypeWriterEffect
              // textStyle={{ fontFamily: "Red Hat Display" }}
              startDelay={100}
              cursorColor="orange"
              text="NASDAQ Timings: 7PM - 1:30AM"
              typeSpeed={150}
            />
            <div className="auth">
              <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}>
                <img src="Images/googlewhite.png" alt="" />
              </a>
              <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/github`}>
                <img src="Images/github.png" alt="" />
              </a>
            </div>
          </div>
          <div className="landingIllustration2">
            {/* <img className="main_Illustration" src="Images/illustration-new.png" alt="" /> */}
            <img className="main_Illustration" src="Images/bg.png" alt="animated"/>
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
            <li>Leaderboard is also updated every 30 seconds.</li>
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
