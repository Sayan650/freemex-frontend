import React, { useRef, useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import "./market.css";
import Modal from "react-modal";

const { io } = require("socket.io-client");

Modal.setAppElement("#root");

function Market() {
  const inputRef = useRef();
  const socketRef = useRef()
  const [BUYmodal, setbuyModal] = useState(false);
  const [data, setData] = useState([])
  const [StockId,setStockId] = useState([]);
  const [maxBuyStock, setmaxBuyStock] = useState();
  const [quantity,setQuantity] = useState();
  const [cashInHand, setcashInHand] = useState(500000);
  
  useEffect(
    () => {
      socketRef.current = io.connect("http://localhost:8000", { transports: ['websocket'] })
      console.log("connection is done")
      socketRef.current.on("market", (res) => {
        const t = res.sort(function(a,b){
          return a.id - b.id
        })
        // console.log(t[0])
        setData(t)
      })
      return () => socketRef.current.disconnect()
    },
    []
  )
  

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const openModal = (e,i) => {
    // console.log(e.target,i,data[i])
    setStockId([data[i].code,i])
    const n = Math.floor(cashInHand/data[i].latestPrice)
    // console.log(cashInHand/data[i].latestPrice)
    setmaxBuyStock(n)
    setbuyModal(true);
  };
  const closeModal = (e) => {
    setbuyModal(false);
  };

  const BuyTransaction = async(e)=>{
    console.log(e.target.value,data[e.target.value])
    console.log(quantity)

    const details = data[e.target.value]
    const code = details.code

    const res = await fetch('/api/transactions?type=bought',{
      method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                  quantity,code
                })
            })
    const result = await res.json()
    console.log(result)
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

            {
              data.length !== 0 && <p>Page last updated on : <span>
                {/* {Date(data[0].updatedAt)} */}
                {Date(data[0].updatedAt).split(" ")[1]+ " " +Date(data[0].updatedAt).split(" ")[2]+ ", "+ new Date(data[0].updatedAt).toLocaleString().split(',')[1]}
                </span></p>
            }

          </div>
        </div>
        <div className="stockscard">
          <div className="cards">
            {data.length === 0 ? (<div style={{margin: 'auto',color: 'white'}}>Loading...</div>)
            :(<>
              {data.map((item, i) => {
                return <div className="scard" key={i}>
                  <p className="nameStock">{item.code}</p>
                  <p className="nStock">
                    <span>{item.name}</span>
                  </p>
                  {/* <p className="noStocks">x3</p> */}
                  <div className="priceStocks">
                    $ {item.latestPrice}{" "}
                    {/* <span>
                    <ArrowDownwardIcon className="downIcon" /> {item.change}
                  </span> */}
                    {
                      item.change < 0 ? (<span>
                        <ArrowDownwardIcon className="downIcon" /> {item.change}
                      </span>) : (<span style={{ color: 'green' }}>
                        <ArrowUpwardIcon className="downIcon" /> {item.change}
                      </span>)
                    }
                  </div>
                  <div className="updateStocks">
                    Last Update: <span>
                      {Date(item.latestUpdate).split(" ")[1]+ " " +Date(item.latestUpdate).split(" ")[2]+ ", "+ new Date(item.latestUpdate).toLocaleString().split(',')[1]}
                    </span>{" "}
                    <span className="span">{item.changePercent.toFixed(3)}%</span>
                  </div>
                  <div className="buybutton">
                    <button className="buymore" onClick={(e) => openModal(e,i)}>
                      Buy
                    </button>
                  </div>
                </div>
            })}</>
            )}
            
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
            <h1>Buy : {StockId[0]}</h1>
          </div>
          <hr />
          <div className="modalBody">
            <p>Max you can buy : {maxBuyStock}</p>
            <input type="text" onChange={(e)=>{setQuantity(e.target.value)}} placeholder="Quantity" />
          </div>
          <hr />
          <div className="modalFooter">
            <button className="buy" value={StockId[1]} onClick={(e)=>BuyTransaction(e)}>Buy</button>
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
