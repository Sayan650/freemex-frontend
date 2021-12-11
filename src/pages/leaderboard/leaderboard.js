import "./leaderboard.css"
import SearchIcon from '@material-ui/icons/Search';
import React,{useState,useRef, useCallback,useEffect} from 'react'

const Leaderboard = () => {
    const inputRef = useRef()
      const [players, setPlayers] = useState([]);
//   const [loading, setLoading] = useState(true);

  const getPlayers = useCallback(async () => {
    const response = await fetch('/api/players?sort=true');
    const players = await response.json();
    setPlayers(players.players);
    // setLoading(false);
  }, []);

  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

    return (
        <div className="leaderboard">
            <div className="leaderboardhead">
                <h1>Leaderboard</h1>
                <div className="searchbox" >
                    <SearchIcon className="searchIcon"/>
                    <input type="text" ref={inputRef} />
                </div>
            </div>
            <div className="leaderboardbody">
                
                <div className="leaderboardTable">
                    <div className="tableHead">
                        <li>#</li>
                        {/* <li>Name</li> */}
                        <li>Username</li>
                        <li>Total Asset</li>
                    </div>
                    {players.map((play, i) => (
                    <div className="tableBody">
                        <div className="row">
                            <li>{i+1}</li>
                            {/* <li>Amool</li> */}
                            <li>{play.username}</li>
                            <li>{play.valueInTotal}</li>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Leaderboard