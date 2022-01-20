import PropTypes from "prop-types";
import "./sidebar.css";
import { useState, useCallback, useEffect } from "react";
import Modal from "react-modal";
import Rules from "../../../pages/rules/rules";

function Sidebar({ state, closeHandler }) {
  const [rules, setRules] = useState(false);
  const openModal = (e) => {
    setRules(true);
    e.preventDefault();
  };
  const closeModal = (e) => {
    setRules(false);
  };
  const [player, setPlayer] = useState([]);
  const getPlayer = useCallback(async () => {
    const response = await fetch("/api/players");
    const player = await response.status;
    setPlayer(player);
  }, []);

  useEffect(() => {
    getPlayer();
  }, [getPlayer]);

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
              <>
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
            )}
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
    </>
  );
}
Sidebar.propTypes = {
  state: PropTypes.bool,
};
export default Sidebar;
