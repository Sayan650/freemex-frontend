import "./navbar.css";
import React, { useState, useCallback, useEffect } from "react";
import Sidebar from "./sidebar/sidebar";
import Backdrop from "./backdrop";
import Modal from "react-modal";
import Rules from "../../pages/rules/rules";

Modal.setAppElement("#root");

const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rules, setRules] = useState(false);
  const [username, setUsername] = useState(false);
  const [name, setName] = useState("");
  const [namemodal, setNameModal] = useState(false);
  const [stat, setStat] = useState(0);
  const [msg, setmsg] = useState("");

  const drawerOpenHandler = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const backdropClickHandler = () => {
    setSidebarOpen(false);
  };

  const openModal = (e) => {
    setRules(true);
    e.preventDefault();
  };
  const openProfileModal = (e) => {
    setUsername(true);
    e.preventDefault();
  };
  const closeModal = (e) => {
    setRules(false);
    setUsername(false);
    setNameModal(false);
  };
  
  const [currentdate, setCurrentdate] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [player, setPlayer] = useState([]);
  const [profile, setProfile] = useState([]);
  const getPlayer = useCallback(async () => {
    const response = await fetch("/api/players");
    const player = await response.status;
    if (player !== 401) {
      const play = await response.json();
      setProfile(play.player);
    }
    setPlayer(player);
  }, []);

  useEffect(() => {
    getPlayer();
  }, [getPlayer]);
  // change Username
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
      setTimeout(() => {}, 5000);
    } else {
      if (status === 200) {
        window.location.reload(false);
        closeModal();
        getPlayer();
        setTimeout(() => {}, 5000);
      } else {
        setmsg(result.message);
        setTimeout(() => {}, 2000);
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
      <div className="navbar">
        <div className="navbarWrapper">
          <div className="logo">
            <a href="/">
              <img src="Images/logo.png" alt="" />
            </a>
          </div>
          <div className="nav">
            {player === 401 ? (
              <>
                <div className="links">
                  <a href="/" onClick={(e) => openModal(e)}>
                    Rules
                  </a>
                </div>
              </>
            ) : (
              <>
                {(currentdate < start ||
                  currentdate > end) &&
                player === 200 ? (
                  <>
                    <div className="links">
                      <a href="/" onClick={(e) => openModal(e)}>
                        Rules
                      </a>
                    </div>
                    <div className="links">
                      <a href="/leaderboard">leaderboard</a>
                    </div>{" "}
                    <div className="links">
                      <a href="/" onClick={(e) => openProfileModal(e)}>
                        {profile === undefined ? (
                          <></>
                        ) : (
                          <img
                            src={profile.avatar}
                            alt=""
                            className="avatar"
                          ></img>
                        )}
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="links">
                      <a href="/portfolio">Portfolio</a>
                    </div>
                    <div className="links">
                      <a href="/" onClick={(e) => openModal(e)}>
                        Rules
                      </a>
                    </div>
                    <div className="links">
                      <a href="/market">Market</a>
                    </div>
                    <div className="links">
                      <a href="/transactions">Transaction</a>
                    </div>
                    <div className="links">
                      <a href="/leaderboard">leaderboard</a>
                    </div>
                    <div className="links">
                      <a href="/" onClick={(e) => openProfileModal(e)}>
                        {profile === undefined ? (
                          <></>
                        ) : (
                          <img
                            src={profile.avatar}
                            alt=""
                            className="avatar"
                          ></img>
                        )}
                      </a>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div className="icon" onClick={drawerOpenHandler}>
            <img src="Images/menu.png" alt="" />
          </div>
        </div>
      </div>
      {sidebarOpen ? (
        <Sidebar state={true} closeHandler={backdropClickHandler} />
      ) : (
        <Sidebar state={false} />
      )}
      {sidebarOpen ? <Backdrop closeHandler={backdropClickHandler} /> : <></>}
      <Modal
        isOpen={rules}
        onRequestClose={() => setRules(false)}
        className="rulesmodal"
      >
        <div className="">
          <Rules />
          <div className="btn">
            <button className="close" onClick={(e) => closeModal(e)}   >
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
};

export default Nav;
