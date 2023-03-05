import "./leaderboard.css";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState, useRef, useCallback, useEffect } from "react";
import MetaDecorator from "../../components/metaDecorator/metaDecorator";

const Leaderboard = () => {
  const inputRef = useRef();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPlayers = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/players?sort=true`,{
      credentials: "include",
    });
    const players = await response.json();
    setPlayers(players.players);
    setLoading(false);
    console.log(players);
  }, []);

  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  const searchValue = (e) => {
    const filter = e.target.value.toLowerCase();

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
            <li className="Playavatar">Username</li>
            <li>Total Asset</li>
          </div>
          {loading ? (
            <div className="loader">
              <h4>Loading...</h4>
            </div>
          ) : (
            <>
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
                    <li key="value">{Number(play.valueInTotal).toLocaleString('en-US')}</li>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
