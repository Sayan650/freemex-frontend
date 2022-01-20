import React, { useRef, useState, useCallback, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import "./market.css";
import Modal from "react-modal";
import MetaDecorator from "../../components/metaDecorator/metaDecorator";
// import { useHistory } from 'react-router-dom';

const { io } = require("socket.io-client");

Modal.setAppElement("#root");

function Market() {
  const inputRef = useRef();
  const socketRef = useRef()
  const [BUYmodal, setbuyModal] = useState(false);
  const [MSGmodal, setMSGModal] = useState(false);
  const [data, setData] = useState([])
  const [StockId, setStockId] = useState([]);
  const [maxBuyStock, setmaxBuyStock] = useState();
  const [quantity, setQuantity] = useState();
  const [hide, setHide] = useState("hide");
  const [msg, setmsg] = useState("");


//   const getSchedule = async () =>{
//     const response = await fetch('/api/schedules')
//     const result = await response.json();
//     console.log(new Date(result.schedule.end));
//     localStorage.setItem('start', result.schedule.start)
//     localStorage.setItem('end', result.schedule.end)
//     if (new Date(result.schedule.start)>new Date()) {
//         history.push("/timer");
//     }if (new Date() > new Date(result.schedule.end)) {
//       history.push("/timer");
//   }
// }

// useEffect(() => {
//     getSchedule()
// },[getSchedule])


  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(
    () => {
      // request for stocks
      const getstocks = async () => {
        const res = await fetch('/api/stocks')
        const result = await res.json()
        if (res.status === 200) {
          const t = result.Stocks.sort(function (a, b) {
            return a.id - b.id
          })
          setData(t)
        }

      }
      getstocks()
      // socket connection for stocks
      socketRef.current = io(`${process.env.REACT_APP_BACKEND_URL}`)
      socketRef.current.on('connection', () => {
        console.log("connection is done")
      })
      socketRef.current.on("connect_error", (err) => {
        console.log("connect error:", err.message);
      });
      socketRef.current.on("market", (res) => {
        const t = res.sort(function (a, b) {
          return a.id - b.id
        })
        setData(t)
      })
      return () => socketRef.current.disconnect()
    },
    []
  )

  // player status
  const [player, setPlayer] = useState([]);
  const getPlayer = useCallback(async () => {
    const response = await fetch('/api/players');
    const player = await response.json();
    setPlayer(player.player);
  }, []);

  useEffect(() => {
    getPlayer();
  }, [getPlayer]);



  // open/close button for modal
  const openModal = (e, i) => {
    setStockId([data[i].code, i])
    const n = Math.floor(player.valueInCash / data[i].latestPrice)
    setmaxBuyStock(n)
    setbuyModal(true);
  };
  const closeModal = (e) => {
    setbuyModal(false);
    setMSGModal(false)
  };

  // for buy transaction 
  const BuyTransaction = async (e) => {
    const details = data[e.target.value]
    const code = details.code
    // console.log(parseInt(quantity))

    if (parseInt(quantity) > 0) {
      const res = await fetch('/api/transactions?type=bought', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          quantity, code
        })
      })
      const result = await res.json()
      // console.log(result)
      if (result.message === "Forbidden, Not enough cash") {
        setHide('error')
        setmsg("Not enough cash")
        setMSGModal(true);
        setbuyModal(false);
        setTimeout(() => {
          setHide('hide')
          setMSGModal(false)
        }, 2000);

      } else {
        if (result.Stock.code === data[e.target.value].code) {
          closeModal()
          getPlayer()
          setHide('success')
          setMSGModal(true);
          setbuyModal(false);
          setTimeout(() => {
            setHide('hide')
            setMSGModal(false)
          }, 5000);
        } else {
          setHide('error')
          setmsg("Some thing went wrong. Please try again.")
          setMSGModal(true);
          setbuyModal(false);
          setTimeout(() => {
            setHide('hide')
            setMSGModal(false)
          }, 2000);
        }
      }
    }else{
      setHide('error')
          setmsg("Invalid input. Please try again.")
          setMSGModal(true);
          setbuyModal(false);
          setTimeout(() => {
            setHide('hide')
            setMSGModal(false)
          }, 2000);
    }

  }

  return (
    <>
      <MetaDecorator
        title="Market - Freemex"
      />
      <div className="Market">
        <div className="Markethead">
          <h1>Market</h1>
          <h2>
            Cash in your hand: $ <span>{player.valueInCash}</span>
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
                {Date(data[0].updatedAt).split(" ")[1] + " " + Date(data[0].updatedAt).split(" ")[2] + ", " + new Date(data[0].updatedAt).toLocaleString().split(',')[1]}
              </span></p>
            }

          </div>
        </div>
        <div className="stockscard">
          <div className="cards">
            {data.length === 0 ? (<div style={{ margin: 'auto', color: 'white' }}>Loading...</div>)
              : (<>
                {data.map((item, i) => {
                  return <div className="scard" key={i}>
                       <img
                      src="Images/divBackground.png"
                      alt=""
                      key={item.code}
                    />
                      <div className="stocks" key={item.name}>
                    <p className="nameStock">{item.code}
                               {
                        item.change < 0 ? (<span>
                          <ArrowDownwardIcon className="downIcon" /> {item.change}
                        </span>) : (<span style={{ color: 'green' }}>
                          <ArrowUpwardIcon className="downIcon" /> {item.change}
                        </span>)
                      }
                    </p>
                    <p className="nStock">
                      <span>{item.name} </span><span className="span">{parseFloat(item.changePercent).toFixed(2)}%</span>
                    </p>
                    <div className="priceStocks">
                      $ {item.latestPrice}{" "}
                    </div>
                    <div className="updateStocks">
                      Last Updated On: <span>
                        {Date(item.latestUpdate).split(" ")[1] + " " + Date(item.latestUpdate).split(" ")[2] + ", " + new Date(item.latestUpdate).toLocaleString().split(',')[1]}
                      </span>
                    </div>
                    <div className="buybutton">
                      <button className="buymore" onClick={(e) => openModal(e, i)}>
                        Buy
                      </button>
                    </div>
                  </div>
                  </div>
                })}</>
              )}
          </div>
        </div>

        <Modal
          className="msgmodal"
          style={{
            width: "fit-content", height: "200px", left: "50%", top: '50%',
            transform: "translate(-50%,-50%)"
          }}
          isOpen={MSGmodal}
          onRequestClose={() => setMSGModal(false)}
        >
          <div className={`snackbar`}>{hide === 'error' ? (`${msg}`) : (<>
            your transaction has successful head over to <a href="/portfolio">Portfolio</a> see.
          </>)}
          </div>
          <div className="modalFooter">
            <button className="close" onClick={(e) => closeModal(e)}>
              Close
            </button>
          </div>
        </Modal>

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
            <input type="text" onChange={(e) => { setQuantity(e.target.value) }} placeholder="Quantity" />
          </div>
          <hr />
          <div className="modalFooter">
            <button className="buy" value={StockId[1]} onClick={(e) => BuyTransaction(e)}>Buy</button>
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
