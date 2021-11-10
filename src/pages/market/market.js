import React, { useRef, useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import "./market.css";
import Modal from 'react-modal'

Modal.setAppElement('#root')

function Market() {
  const inputRef = useRef();
  const [BUYmodal, setbuyModal] = useState(false)

  useEffect(() => {
    inputRef.current.focus();
  }, []);
const openModal = (e) => {
       
            setbuyModal(true)
      
}
    const closeModal = (e) => {
        setbuyModal(false)
    }

  return (
    <>
      <div className="Market">
        <div className="Markethead">
          <h1>Market</h1>
          <h2>
            Cash in your hand: $<span>0</span>
          </h2>
          <div className="searchbox">
            <SearchIcon className="searchIcon" />
            <input type="text" ref={inputRef} />
          </div>
        </div>
        <div className="Marketbody">
          <div className="updated">
                        <p>Page last updated on : <span>8888</span></p>
                    </div>
        </div>
            <div className="stockscard">
                        <div className="cards">

                            <div className="scard">
                                <p className="nameStock">AAPL</p>
                                <p className="nStock"><span>Apple inc.</span></p>
                                <p className="noStocks">
                                    x3
                            </p>
                                <div className="priceStocks">$ 148.97 <span><ArrowDownwardIcon className="downIcon" /> -5.10</span></div>
                                <div className="updateStocks">Last Update: <span>Sep 11th, 1:30:00 am </span> <span className="span">-3.31%</span>
                                </div>
                                <div className="buybutton">
                                    <button className="buymore" onClick={(e) => openModal(e)}>Buy</button>
                                </div>
                            </div>


                        </div>
                    </div>

            <Modal style={{ width: 'fit-content' }} isOpen={BUYmodal} onRequestClose={() => setbuyModal(false)}>
                <div className="modalheader">
                    <h1>Buy : Apple Inc.</h1>
                </div>
                <hr />
                <div className="modalBody">
                    <p>Max you can buy  : 3333</p>
                    <input type="text" placeholder="Quantity" />
                </div>
                <hr />
                <div className="modalFooter">
                    <button className="buy">Buy</button>
                    <button className="close" onClick={(e) => closeModal(e)} >Cancel</button>
                </div>
            </Modal>
        </div>
        </>
        );
        }

export default Market;
