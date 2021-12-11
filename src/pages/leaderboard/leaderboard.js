import "./leaderboard.css"
import SearchIcon from '@material-ui/icons/Search';
import React,{useState,useRef,useEffect, useCallback} from 'react'

const Leaderboard = () => {
    const inputRef = useRef()
  const [players, setPlayers] = useState([]);
    // useEffect(()=>{
    //     inputRef.current.focus()

    //     fetch('/api/players?sort=true',{
    //         method: 'GET',
    //         headers:{
    //             Accept: 'application/json',
    //             "Content-Type": 'application/json'
    //         }
    //     }).then((res)=>{
    //         res.json().then((data)=>{console.log(data)})
    //     }).catch((err)=>{console.log(err)})
    // },[])
  const getPlayers = useCallback(async () => {
    const response = await fetch('/api/players?sort=true');
    const players = await response.json();
     setPlayers(players);
  }, []);

  useEffect(() => {
    getPlayers();
  }, [getPlayers]);
  console.log(players);
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
                        <li>Name</li>
                        <li>Username</li>
                        <li>Total Asset</li>
                    </div>
                    <div className="tableBody">
                        <div className="row">
                            <li>1</li>
                            <li>Amool</li>
                            <li>B@by</li>
                            <li>500000.00</li>
                        </div>
                    </div>
                </div>


                
                {/* <table>
                    <thead>
                        <tr>
                            <th className="sNo" >#</th>
                            <th className="name
                            " >Name</th>
                            <th className="Username">Username</th>
                            <th className="assets">Total Asset</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="sNo">1</td>
                            <td className="name
                            " >Amool</td>
                            <td className="Username">B@by</td>
                            <td className="assets">500000.00</td>
                        </tr>
                        
                    </tbody>
                </table> */}
            </div>
        </div>
    )
}

export default Leaderboard