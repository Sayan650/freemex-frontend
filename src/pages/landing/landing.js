import "./landing.css";
import TypeWriterEffect from "react-typewriter-effect";


function LandingSection() {

  const googleLogin = async (e)=> {
    e.preventDefault();

    

    // const res = await fetch(`https://localhost:8000/google`,{
    //   method: 'GET',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   credentials: "include",
    // })

    // const result = res.json();
    // console.log(result)

  }

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
              <img src="Images/googlewhite.png" alt="" onClick={googleLogin}/>
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
