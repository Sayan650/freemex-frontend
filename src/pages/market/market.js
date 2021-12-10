import React, { useRef, useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import "./market.css";
import Modal from "react-modal";

const { io } = require("socket.io-client");

Modal.setAppElement("#root");

function Market() {
  const inputRef = useRef();
  const socketRef = useRef()
  const [BUYmodal, setbuyModal] = useState(false);
  const [data, setData] = useState([])

  useEffect(
    () => {
      socketRef.current = io.connect("http://localhost:8000", { transports: ['websocket'] })
      console.log("connection is done")
      socketRef.current.on("market", (res) => { 
        console.log(res); 
        setData(res)
      })
      return () => socketRef.current.disconnect()
    },
    []
  )

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const openModal = (e) => {
    setbuyModal(true);
    const t = [1,3,4,5,6]
    console.log(typeof(data),typeof(t),data[0].name)
    // for (let i = 0; i < data.length; i++) {
    //   const element = data[i];
    //   console.log(element.id)
    // }
  };
  const closeModal = (e) => {
    setbuyModal(false);
  };

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
            <p>
              {/* Page last updated on : <span>{Date(data[0].updatedAt)}</span> */}
            </p>
          </div>
        </div>
        <div className="stockscard">
          <div className="cards">
            {data.map((item,i)=>{
              if (data.length !== 0) {
                return <div className="scard" key={i}>
                <p className="nameStock">{item.code}</p>
                <p className="nStock">
                  <span>{item.name}</span>
                </p>
                {/* <p className="noStocks">x3</p> */}
                <div className="priceStocks">
                  $ {item.latestPrice}{" "}
                  <span>
                    <ArrowDownwardIcon className="downIcon" /> {item.change}
                  </span>
                </div>
                <div className="updateStocks">
                  Last Update: <span>Sep 11th, 1:30:00 am </span>{" "}
                  <span className="span">{item.changePercent}</span>
                </div>
                <div className="buybutton">
                  <button className="buymore" onClick={(e) => openModal(e)}>
                    Buy
                  </button>
                </div>
              </div>
              }
            })}
            {/* <div className="scard">
              <p className="nameStock">AAPL</p>
              <p className="nStock">
                <span>Apple inc.</span>
              </p>
              <p className="noStocks">x3</p>
              <div className="priceStocks">
                $ 148.97{" "}
                <span>
                  <ArrowDownwardIcon className="downIcon" /> -5.10
                </span>
              </div>
              <div className="updateStocks">
                Last Update: <span>Sep 11th, 1:30:00 am </span>{" "}
                <span className="span">-3.31%</span>
              </div>
              <div className="buybutton">
                <button className="buymore" onClick={(e) => openModal(e)}>
                  Buy
                </button>
              </div>
            </div> */}
          </div>
        </div>

        <Modal
          style={{ width: "fit-content" }}
          isOpen={BUYmodal}
          onRequestClose={() => setbuyModal(false)}
        >
          <div className="modalheader">
            <h1>Buy : Apple Inc.</h1>
          </div>
          <hr />
          <div className="modalBody">
            <p>Max you can buy : 3333</p>
            <input type="text" placeholder="Quantity" />
          </div>
          <hr />
          <div className="modalFooter">
            <button className="buy">Buy</button>
            <button className="close" onClick={(e) => closeModal(e)}>
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Market;
