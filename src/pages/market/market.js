import React, { useRef, useState, useCallback, useEffect} from "react";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import "./market.css";
import Modal from "react-modal";
import MetaDecorator from "../../components/metaDecorator/metaDecorator";
// import { useHistory } from 'react-router-dom';
import { StockContext } from "../../context/context";


Modal.setAppElement("#root");

function Market() {
    const stock = React.useContext(StockContext);
  const inputRef = useRef();
  const [BUYmodal, setbuyModal] = useState(false);
  const [MSGmodal, setMSGModal] = useState(false);
  const [StockId, setStockId] = useState([]);
  const [maxBuyStock, setmaxBuyStock] = useState();
  const [quantity, setQuantity] = useState();
  const [hide, setHide] = useState("hide");
  const [msg, setmsg] = useState("");

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
      var current_date = new Date().getTime();
      var end = new Date(result.schedule.end).getTime();
      var start = new Date(result.schedule.start).getTime();
  
      if (
        current_date < start ||
        current_date > end
      ) {
        window.location.href = "/timer";
      }
    }
    time()
  }, []);
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);


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
    setStockId([stock[i].code, i])
    const n = Math.floor(player.valueInCash / stock[i].latestPrice)
    setmaxBuyStock(n)
    setbuyModal(true);
  };
  const closeModal = (e) => {
    setbuyModal(false);
    setMSGModal(false)
  };

  // for buy transaction 
  const BuyTransaction = async (e) => {
    const details = stock[e.target.value]
    const code = details.code
    // console.log(parseInt(quantity))

    if (parseInt(quantity) > 0 && Number.isInteger(Number(quantity))) {
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
        if (result.Stock.code === stock[e.target.value].code) {
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
    } else {
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

  const searchValue = (e) => {
    // console.log(e.target.value);
    const filter = e.target.value.toLowerCase();

    document.querySelectorAll('.scard').forEach(element => {
      if ((element.children[1].children[1].children[0].innerHTML.indexOf(filter) > -1 ) || (element.children[1].children[1].children[0].innerHTML.toLowerCase().indexOf(filter) > -1)) {
        element.style.display = "";
      }else if ((element.children[1].children[0].children[0].innerHTML.indexOf(filter) > -1) || (element.children[1].children[0].children[0].innerHTML.toLowerCase().indexOf(filter) > -1)) {
        element.style.display = "";
      } else {
        element.style.display = "none";
      }
    });

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
            Cash in your hand: <span>${player.valueInCash}</span>
          </h2>
          <div className="searchbox">
            <SearchIcon className="searchIcon" />
            <input type="text" ref={inputRef} onChange={(e) => { searchValue(e) }} />
          </div>
        </div>
        <div className="Marketbody">
          <div className="updated">

            {
              stock.length !== 0 && <p>Page last updated on : <span>
                {/* {Date(stock[0].updatedAt)} */}
                {Date(stock[0].updatedAt).split(" ")[1] + " " + Date(stock[0].updatedAt).split(" ")[2] + ", " + new Date(stock[0].updatedAt).toLocaleString().split(',')[1]}
              </span></p>
            }

          </div>
        </div>
        <div className="stockscard">
          <div className="cards">
            {stock.length === 0 ? (<div style={{ margin: 'auto', color: 'white' }}>Loading...</div>)
              : (<>
                {stock.map((item, i) => {
                  return <div className="scard" key={i}>
                    <img
                      src="Images/divBackground.png"
                      alt=""
                      key={item.code}
                    />
                    <div className="stock" key={item.name}>
                      <p className="nameStock"><span>{item.code}</span>
                        {
                          item.change < 0 ? (<span style={{ color: 'red' }}>
                            <ArrowDownwardIcon className="downIcon" /> {item.change}
                          </span>) : (<span style={{ color: ' var(--button-green-color)' }}>
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
            Your transaction was successful head over to <a href="/portfolio" style={{
  color: 'var(--hover-color)'}}>Portfolio</a> see.
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
          <div className="cross">
          <img src="Images/cross.png" alt="" onClick={(e) => closeModal(e)}/>
          </div>
            <h1>Buy : {StockId[0]}</h1>
          </div>
          <hr />
          <div className="modalBody">
            <p>Max you can buy : {maxBuyStock}</p>
            <input type="number" min="1" max={maxBuyStock} onChange={(e) => { setQuantity(e.target.value) }} placeholder="Quantity" />
          </div>
          <hr />
          <div className="modalFooter">
            <button className="buy" value={StockId[1]} onClick={(e) => BuyTransaction(e)}>Buy</button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Market;
