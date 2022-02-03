import PropTypes from "prop-types";
import "./sidebar.css";
import { useState, useCallback, useEffect } from "react";
import Modal from "react-modal";
import Rules from "../../../pages/rules/rules";

function Sidebar({ state, closeHandler }) {
  const [rules, setRules] = useState(false);
  const [username, setUsername] = useState(false);
  const [name, setName] = useState("");
  const [namemodal, setNameModal] = useState(false);
  const [stat, setStat] = useState(0);
  const [msg, setmsg] = useState("");

  const openModal = (e) => {
    setRules(true);
    e.preventDefault();
  };

  const openProfileModal = (e) => {
    setUsername(true);
    e.preventDefault();
  }

  const closeModal = (e) => {
    setRules(false);
    setUsername(false);
    setNameModal(false);
  };

  const [player, setPlayer] = useState([]);
  const [profile, setProfile] = useState([]);

  const getPlayer = useCallback(async () => {
    const response = await fetch('/api/players');
    const player = await response.status;
    if(player !== 401) {
    const play = await response.json();
    setProfile(play.player);
    }
    setPlayer(player);
  }, []);

  useEffect(() => {
    getPlayer();
  }, [getPlayer]);

  const openNameModal = (e) => {
    setNameModal(true);
  };

  const changeName = async (e) => {
    const res = await fetch("/api/players?scope=username ", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: name,
      }),
    });
    const result = await res.json();
    const status = await res.status;
    console.log(result);
      if (status === 400) {
      setStat(400);
      setmsg("Username should be unique");
      setTimeout(() => {
      }, 5000);
    } else {
      if (status === 200) {
        window.location.reload(false);
        closeModal();
        getPlayer();
        setTimeout(() => {
        }, 5000);
      } else {
        setmsg(result.message);
        setTimeout(() => {
        }, 2000);
      }
    }
  };

  const nameChecker = (name) => {
    if (name.length < 5) {
      setStat(500);
      setmsg('Username should be of atleast 5 characters.');
    }
    else {
      setStat(0);
      setmsg("");
    }
  };
  const [currentdate, setCurrentdate] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

 useEffect(() => {
    const time = async()=>{
      const res = await fetch('/api/schedules', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
      })
      const result = await res.json();
      console.log(result);
      if(result.message!== "No schedule found, please contact admin."){
      setCurrentdate(new Date().getTime());
      setEnd(new Date(result.schedule.end).getTime());
      setStart(new Date(result.schedule.start).getTime());
    }
  }
    time()
  }, []);

  return (
    <>
      {state ? (
        <div className="sidebar" onClick={closeHandler}>
          <ul className="menuList">
            {player === 401 ? (
              <>
                <li className="menuListItem">
                  <a href="/" onClick={(e) => openModal(e)}>
                    Rules
                  </a>
                </li>
              </>
            ) : (
              <> {((currentdate < start || currentdate > end)  &&
      player === 200) ? (<>            <li className="menuListItem">
                  <a href="/" onClick={(e) => openProfileModal(e)}>
                   {profile === undefined ? (<></>) : (
                  <img src={profile.avatar} alt="" className="avatar"
                  ></img> )}</a>
             </li> <li className="menuListItem">
                  <a href="/leaderboard">leaderboard</a>
                </li>
                <li className="menuListItem">
                  <a href="/" onClick={(e) => openModal(e)}>
                    Rules
                  </a>
                </li>       <li className="menuListItem">
                  <a href="/auth/logout">Logout</a>
                </li> </> ) :(<>
                <li className="menuListItem">
                  <a href="/" onClick={(e) => openProfileModal(e)}>
                   {profile === undefined ? (<></>) : (
                  <img src={profile.avatar} alt="" className="avatar"
                  ></img> )}</a>
             </li>
               <li className="menuListItem">
                <a href="/portfolio">Portfolio</a>
               </li>
                <li className="menuListItem">
                  <a href="/leaderboard">leaderboard</a>
                </li>
                <li className="menuListItem">
                  <a href="/" onClick={(e) => openModal(e)}>
                    Rules
                  </a>
                </li>
                <li className="menuListItem">
                  <a href="/transactions">Transaction</a>
                </li>
                <li className="menuListItem">
                  <a href="/market">Market</a>
                </li>
                <li className="menuListItem">
                  <a href="/auth/logout">Logout</a>
                </li>
              </>
            )}</>)}
          </ul>
        </div>
      ) : (
        <></>
      )}
      <Modal
        isOpen={rules}
        onRequestClose={() => setRules(false)}
        className="rulesmodal"
      >
        <div className="">
          <Rules />
          <div className="btn">
            <button className="close" onClick={(e) => closeModal(e)}>
              Close
            </button>
          </div>
        </div>
      </Modal>
      {/* Profile Modal */}
       <Modal isOpen={username} onRequestClose={() => setUsername(false)} className="usernamemodal">
           <div className="modalheader">
          <h3>Hello {profile.username}!</h3>
        </div>
        <div className="Username">
          <div className="changebutton">
            <button className="buymore" onClick={(e) => openNameModal(e)}>
              Change Username
            </button>
          </div>
             <div className="changebutton">
          <button
          className="buymore"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/auth/logout";
            }}
          >
            Logout
          </button>
          </div>
        </div>
        <div className="btn">
          <button className="close" onClick={(e) => closeModal(e)}>
            Close
          </button>
        </div>
      </Modal>


      {/* Modal to change the Username */}
      <Modal
        style={{ width: "fit-content" }}
        isOpen={namemodal}
        onRequestClose={() => setNameModal(false)}
      >
        <div className="modalheader">
          <h1>Change Username</h1>
        </div>
        <hr />
        <div className="modalBody">
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
              nameChecker(e.target.value);
            }}
            placeholder="text"
          />
        </div>
        <hr />
        <div className="modalFooter">
          <button className="buy" onClick={(e) => changeName(e)}>
            Change
          </button>
          <button className="close" onClick={(e) => closeModal(e)}>
            Cancel
          </button>
             {stat === 500 ? (
            <div className="time">{msg}</div>
          ) : (<></>
          )}
                   {stat === 400 ? (
            <div className="time">{msg}</div>
          ) : (<></>
          )}
        </div>
      </Modal>
    </>
  );
}
Sidebar.propTypes = {
  state: PropTypes.bool,
};
export default Sidebar;
