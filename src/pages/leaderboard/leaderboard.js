import "./leaderboard.css";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState, useRef, useCallback, useEffect } from "react";
import MetaDecorator from "../../components/metaDecorator/metaDecorator";

const Leaderboard = () => {
  const inputRef = useRef();
  const [players, setPlayers] = useState([]);

  const getPlayers = useCallback(async () => {
    const response = await fetch("/api/players?sort=true");
    const players = await response.json();
    setPlayers(players.players);
    console.log(players);
  }, []);

  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  const searchValue = (e) => {
    const filter = e.target.value;

    document.querySelectorAll(".row").forEach((element) => {
      if (
        element.children[1].innerHTML.indexOf(filter) > -1 ||
        element.children[1].innerHTML.toLowerCase().indexOf(filter) > -1
      ) {
        element.style.display = "";
      } else {
        element.style.display = "none";
      }
    });
  };

  return (
    <div className="leaderboard">
      <MetaDecorator title="Leaderboard - Freemex" />
      <div className="leaderboardhead">
        <h1>Leaderboard</h1>
        <div className="searchbox">
          <SearchIcon className="searchIcon" />
          <input
            type="text"
            ref={inputRef}
            key="input"
            onChange={(e) => {
              searchValue(e);
            }}
          />
        </div>
      </div>
      <div className="leaderboardbody">
        <div className="leaderboardTable">
          <div className=""></div>
          <div className="tableHead">
            <li className="NO">#</li>
            {/* <li>Name</li> */}
            <li>Username</li>
            <li>Total Asset</li>
          </div>
          {players.map((play, i) => (
            <div key={i} className="tableBody">
              <div key="row" className="row">
                <li key="no" className="NO">
                  {i + 1}
                </li>
                <li className="Playavatar" key="name">
                  <img src={play.avatar} alt=""></img>
                  {play.username}
                </li>
                <li key="value">{play.valueInTotal}</li>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
