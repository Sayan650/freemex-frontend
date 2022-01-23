import "./portfolio.css";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React, { useRef, useState, useCallback, useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import MetaDecorator from "../../components/metaDecorator/metaDecorator";
Modal.setAppElement("#root");

const { io } = require("socket.io-client");

const Portfolio = () => {
  const [BUYmodal, setbuyModal] = useState(false);
  const [sellmodal, setsellModal] = useState(false);
  const [MSGmodal, setMSGModal] = useState(false);
  const socketRef = useRef();
  const [data, setData] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [StockId, setStockId] = useState([]);
  const [min, setMin] = useState("");
  const [maxBuyStock, setmaxBuyStock] = useState();
  const [quantity, setQuantity] = useState();
  const [hide, setHide] = useState("hide");
  const [msg, setmsg] = useState("");
  const [pCalculate, setPcalculate] = useState();

  const [player, setPlayer] = useState([]);
  const getPlayer = useCallback(async () => {
    const response = await fetch("/api/players");
    const player = await response.json();
    console.log(player);
    setPlayer(player.player);
  }, []);

  useEffect(() => {
    getPlayer();
  }, [getPlayer]);
  useEffect(() => {
    const getStocks = async () => {
      const response = await fetch("/api/assets");
      const asset = await response.json();
      console.log(asset.assets);
      setStocks(asset.assets);
    };
    getStocks();
  }, []);

  useEffect(() => {
    // request for stocks
    const getstocks = async () => {
      const res = await fetch("/api/stocks");
      const result = await res.json();
      const t = result.Stocks.sort(function (a, b) {
        return a.id - b.id;
      });
      setData(t);
    };
    getstocks();
    // socket connection for stocks
    socketRef.current = io(`${process.env.REACT_APP_BACKEND_URL}`);
    socketRef.current.on("connection", () => {
      console.log("connection is done");
    });
    socketRef.current.on("connect_error", (err) => {
      console.log("connect error:", err.message);
    });
    socketRef.current.on("market", (res) => {
      const t = res.sort(function (a, b) {
        return a.id - b.id;
      });
      setData(t);
    });
    return () => socketRef.current.disconnect();
  }, []);

  const openBuyModal = (e, i) => {
    setStockId([stocks[i].Stock.code, i]);
    const n = Math.floor(player.valueInCash / stocks[i].Stock.latestPrice);
    setmaxBuyStock(n);
    setbuyModal(true);
  };
  const closeModal = (e) => {
    setbuyModal(false);
    setsellModal(false);
    setMSGModal(false);
  };
  const openModal = (e, i) => {
    setStockId([stocks[i].Stock.code, i]);
    const n = stocks[i].asset.quantity;
    setmaxBuyStock(n);
    setsellModal(true);
  };
  // for buy transaction
  const BuyTransaction = async (e) => {
    const details = stocks[e.target.value];
    const code = details.Stock.code;
    console.log(code);
    // console.log(parseInt(quantity))

    if (parseInt(quantity) > 0 && Number.isInteger(Number(quantity))) {
      const res = await fetch("/api/transactions?type=bought", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          quantity,
          code,
        }),
      });
      const result = await res.json();
      // console.log(result)
      if (result.message === "Forbidden, Not enough cash") {
        setHide("error");
        setmsg("Not enough cash");
        setMSGModal(true);
        setbuyModal(false);
        setTimeout(() => {
          setHide("hide");
          setMSGModal(false);
        }, 2000);
      } else {
        if (result.Stock.code === stocks[e.target.value].Stock.code) {
          closeModal();
          getPlayer();
          setHide("success");
          setMSGModal(true);
          setbuyModal(false);
          setTimeout(() => {
            setHide("hide");
            setMSGModal(false);
          }, 5000);
        } else {
          setHide("error");
          setmsg("Some thing went wrong. Please try again.");
          setMSGModal(true);
          setbuyModal(false);
          setTimeout(() => {
            setHide("hide");
            setMSGModal(false);
          }, 2000);
        }
      }
    } else {
      setHide("error");
      setmsg("Invalid input. Please try again.");
      setMSGModal(true);
      setbuyModal(false);
      setTimeout(() => {
        setHide("hide");
        setMSGModal(false);
      }, 2000);
    }
  };
  // for sell transaction
  const sellTransaction = async (e) => {
    const details = stocks[e.target.value];
    const code = details.Stock.code;

    if (parseInt(quantity) > 0 && Number.isInteger(Number(quantity))) {
      const res = await fetch("/api/transactions?type=sold", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          quantity,
          code,
        }),
      });
      const result = await res.json();
      console.log(result);

      // console.log(result)
      if (result.atleastWaitPeriod >= 0) {
        setHide("error");
        setmsg("Some thing went wrong. Please try again.");
        var millis = result.atleastWaitPeriod;
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        var time = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        setMin(time);
        setTimeout(() => {
          setHide("hide");
        }, 10000);
      } else {
        if (result.Stock.code === stocks[e.target.value].Stock.code) {
          window.location.reload(false);
          closeModal();
          getPlayer();
          setHide("success");
          setmsg("Some thing went wrong. Please try again.");
          setsellModal(false);
          setTimeout(() => {
            setHide("hide");
          }, 3000);
        } else {
          setHide("error");
          setmsg("Some thing went wrong. Please try again.");
          setsellModal(false);
          setTimeout(() => {
            setHide("hide");
          }, 2000);
        }
      }
    } else {
      setHide("error");
      setmsg("Invalid input. Please try again.");
      setMSGModal(true);
      setsellModal(false);
      setTimeout(() => {
        setHide("hide");
        setMSGModal(false);
      }, 2000);
    }
  };

  const profitCal = (index)=>{
    // console.log(data,stocks,e,index);
    // const marketPrice = data[index].latestPrice
    const marketdate = stocks[index]
    const buyPrice = parseFloat(stocks[index].asset.invested)/parseFloat(stocks[index].asset.quantity)
    const code = marketdate.Stock.code
    // console.log(marketdate,data)
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.code === code) {
        const marketPrice = element.latestPrice
        console.log(marketPrice - buyPrice)
        setPcalculate(marketPrice - buyPrice)
      }
    }
    // const 
  }

  return (
    <div className="portfolio" >
      <MetaDecorator title="Portfolio - Freemex" />
      <div className="portfoliopage">
        <div className="heading">
          <h1>Portfolio</h1>
        </div>
        <div className="body">
          <div className="card">
            <p>
              Cash: $ <span>{player.valueInCash}</span>
            </p>
            <p>
              Value in Stock : $ <span>{player.valueInStocks}</span>
            </p>
            <p className="total">
              Total : $ <span>{player.valueInTotal}</span>
            </p>
          </div>
          <div className="msg">
            {data.length !== 0 && (
              <p>
                Page last updated on :{" "}
                <span>
                  {Date(data[0].updatedAt).split(" ")[1] +
                    " " +
                    Date(data[0].updatedAt).split(" ")[2] +
                    ", " +
                    new Date(data[0].updatedAt).toLocaleString().split(",")[1]}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="stockDetails">
          <h2>Your Stocks</h2>
          <div className="stockscard">
            <div className="cards">
              {stocks.map((item, i) => {
                return item.asset.quantity === 0 ? (
                  <></>
                ) : (
                  <div className="scards" key={i} onClick={(e)=>profitCal(i)}>
                    <img
                      src="Images/divBackground.png"
                      alt=""
                      key={item.Stock.code}
                    />
                    <div className="stocks" key={item.Stock.change}>
                      <p className="nameStock">
                        {item.Stock.code}{" "}
                        {item.Stock.change < 0 ? (
                          <span>
                            <ArrowDownwardIcon className="downIcon" />{" "}
                            {item.Stock.change}
                          </span>
                        ) : (
                          <span style={{ color: "green" }}>
                            <ArrowUpwardIcon className="downIcon" />{" "}
                            {item.Stock.change}
                          </span>
                        )}
                      </p>
                      <p className="nStock">
                        <span>{item.Stock.name}</span>

                        <span className="span">
                          {parseFloat(item.Stock.changePercent).toFixed(2)}%
                        </span>
                      </p>
                      <div className="priceStocks">
                        $ {item.Stock.latestPrice}{" "}
                      </div>
                      <div className="updateStocks">
                        Last Updated On :{" "}
                        <span>
                          {Date(item.Stock.latestUpdate).split(" ")[1] +
                            " " +
                            Date(item.Stock.latestUpdate).split(" ")[2] +
                            ", " +
                            new Date(item.Stock.latestUpdate)
                              .toLocaleString()
                              .split(",")[1]}
                        </span>{" "}
                      </div>
                      <div className="line"></div>
                      <div className="updateStocksColumn">
                        <div className="updateStock">
                          <div className="amount">${item.asset.invested}</div>
                          Amount Invested
                        </div>
                        <div className="updateStock">
                          <div className="amount">
                            {item.asset.netProfit < 0 ? (
                              <span style={{ color: "red" }}>
                                ${item.asset.netProfit}
                              </span>
                            ) : (
                              <span style={{ color: "green" }}>
                                ${item.asset.netProfit}
                              </span>
                            )}
                          </div>
                          Net Profit
                        </div>
                        <div className="updateStock">
                          <div className="amount">{item.asset.quantity}</div>
                          Quantity Purchased
                        </div>
                      </div>
                      <div className="button" key={item.asset.quantity}>
                        <button
                          className="buymore"
                          onClick={(e) => openBuyModal(e, i)}
                          key={item.asset.netProfit}
                        >
                          Buy More
                        </button>
                        <button
                          className="sell"
                          key={item.asset.invested}
                          onClick={(e) => openModal(e, i)}
                        >
                          Sell
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="market">
            <Link to="/market">
              <button className="marketbtn">Buy Stocks</button>
            </Link>
          </div>
        </div>
      </div>

      {/* -------------- modal for msg  ------------- */}

      <Modal
        className="msgmodal"
        style={{
          width: "fit-content",
          height: "200px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
        isOpen={MSGmodal}
        onRequestClose={() => setMSGModal(false)}
      >
        <div className={`snackbar`}>
          {hide === "error" ? (
            `${msg}`
          ) : (
            <>
              Your transaction was successful head over to{" "}
              <a href="/portfolio">Portfolio</a> see.
            </>
          )}
        </div>
        <div className="modalFooter">
          <button className="close" onClick={(e) => closeModal(e)}>
            Close
          </button>
        </div>
      </Modal>

      {/* -------------- modal for buy More ------------- */}

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
          <input
            type="number"
            min="1"
            max={maxBuyStock}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            placeholder="Quantity"
          />
        </div>
        <hr />
        <div className="modalFooter">
          <button
            className="buy"
            value={StockId[1]}
            onClick={(e) => BuyTransaction(e)}
          >
            Buy
          </button>
          <button className="close" onClick={(e) => closeModal(e)}>
            Cancel
          </button>
          {hide === "error" ? (
            <div className="time">You don't have enough cash</div>
          ) : (
            <></>
          )}
        </div>
      </Modal>

      {/* -------------- modal for sell ------------- */}

      <Modal
        style={{ width: "fit-content" }}
        isOpen={sellmodal}
        onRequestClose={() => setsellModal(false)}
      >
        <div className="modalheader">
          <h1>Sell : {StockId[0]}</h1>
        </div>
        <hr />
        <div className="modalBody">
          <p>Max you can sell : {maxBuyStock}</p>
          <input
            type="number"
            min="1"
            max={maxBuyStock}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            placeholder="Quantity"
          />
        </div>
        <hr />
        <div className="modalFooter">
          <button
            className="buy"
            value={StockId[1]}
            onClick={(e) => sellTransaction(e)}
          >
            Sell
          </button>
          <button className="close" onClick={(e) => closeModal(e)}>
            Cancel
          </button>
          {hide === "error" ? (
            <div className="time">Wait for {min} min before you could sell</div>
          ) : (
            <></>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Portfolio;
