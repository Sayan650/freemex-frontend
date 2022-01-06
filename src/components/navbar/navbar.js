import "./navbar.css";
import React, { useState, useCallback, useEffect } from 'react'
import Sidebar from "./sidebar/sidebar";
import Backdrop from "./backdrop";
import Modal from "react-modal";
import Rules from "../../pages/rules/rules";
import { useHistory } from 'react-router-dom';

Modal.setAppElement("#root");

const Nav = () => {
  const history = useHistory();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rules, setRules] = useState(false);

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
  const closeModal = (e) => {
    setRules(false);
  };

  const [player, setPlayer] = useState([]);
  const getPlayer = useCallback(async () => {
    const response = await fetch('/api/players');
    const player = await response.status;
    setPlayer(player);
  }, []);

  useEffect(() => {
    getPlayer();
  }, [getPlayer]);

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
            {player === 401 ? (<>
              <div className="links">
                <a href="/leaderboard">leaderboard</a>
              </div>
              <div className="links">
                <a href="/" onClick={(e) => openModal(e)}>
                  Rules
                </a>
              </div>
            </>) : (<>
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
                <a href="/auth/logout">Logout</a>
              </div>
            </>)}
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
      <Modal isOpen={rules} onRequestClose={() => setRules(false)} className="rulesmodal">
        <div className="">
          <Rules />
          <div className="btn">
            <button className="close" onClick={(e) => closeModal(e)}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Nav;
