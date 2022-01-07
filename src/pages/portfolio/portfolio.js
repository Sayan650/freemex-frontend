import "./portfolio.css";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React, { useRef, useState, useCallback, useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
Modal.setAppElement("#root");

const { io } = require("socket.io-client");

const Portfolio = () => {
  const [BUYmodal, setbuyModal] = useState(false);
  const [sellmodal, setsellModal] = useState(false);
  const [namemodal, setNameModal] = useState(false);
  const socketRef = useRef();
  const [data, setData] = useState([]);
  const [stat, setStat] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [StockId, setStockId] = useState([]);
  const [min, setMin] = useState("");
  const [maxBuyStock, setmaxBuyStock] = useState();
  const [quantity, setQuantity] = useState();
  const [name, setName] = useState("");
  const [hide, setHide] = useState("hide");
  const [msg, setmsg] = useState("");

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
    socketRef.current = io.connect("http://localhost:8000", {
      transports: ["websocket"],
    });
    console.log("connection is done");
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
    setNameModal(false);
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
      setmsg("Some thing went wrong. Please try again.");
      setTimeout(() => {
        setHide("hide");
      }, 2000);
    } else {
      if (result.Stock.code === stocks[e.target.value].Stock.code) {
        window.location.reload(false);
        closeModal();
        getPlayer();
        setHide("success");
        setTimeout(() => {
          setHide("hide");
        }, 5000);
      } else {
        setHide("error");
        setmsg("Some thing went wrong. Please try again.");
        setTimeout(() => {
          setHide("hide");
        }, 2000);
      }
    }
  };
  // for sell transaction
  const sellTransaction = async (e) => {
    const details = stocks[e.target.value];
    const code = details.Stock.code;

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
        setTimeout(() => {
          setHide("hide");
        }, 5000);
      } else {
        setHide("error");
        setmsg("Some thing went wrong. Please try again.");
        setTimeout(() => {
          setHide("hide");
        }, 2000);
      }
    }
  };
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
    if (status === 400 || status === 500) {
      setHide("error");
      setmsg(result.message);
      setTimeout(() => {
        setHide("hide");
      }, 5000);
    } else {
      if (status === 200) {
        window.location.reload(false);
        closeModal();
        getPlayer();
        setHide("success");
        setTimeout(() => {
          setHide("hide");
        }, 5000);
      } else {
        setHide("error");
        setmsg(result.message);
        setTimeout(() => {
          setHide("hide");
        }, 2000);
      }
    }
  };
  const nameChecker = async (e) => {
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
    setStat(status);
    setmsg(result.message);
  };
  return (
    <div className="portfolio">
      <div className="portfoliopage">
        <div className="Logged">
          <h1>Logged in as :</h1>
          <h2>{player.username}</h2>
        </div>
        <div className="changebutton">
          <button className="buymore" onClick={(e) => openNameModal(e)}>
            Change Username
          </button>
        </div>
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
                  <div className="scard" key={i}>
                    <p className="nameStock">{item.Stock.code}</p>
                    <p className="nStock">
                      <span>{item.Stock.name}</span>
                    </p>
                    <div className="priceStocks">
                      $ {item.Stock.latestPrice}{" "}
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
                    </div>
                    <div className="updateStocks">
                      Last Update:{" "}
                      <span>
                        {Date(item.Stock.latestUpdate).split(" ")[1] +
                          " " +
                          Date(item.Stock.latestUpdate).split(" ")[2] +
                          ", " +
                          new Date(item.Stock.latestUpdate)
                            .toLocaleString()
                            .split(",")[1]}
                      </span>{" "}
                      <span className="span">
                        {parseFloat(item.Stock.changePercent).toFixed(2)}%
                      </span>
                    </div>
                    <div className="updateStocks">
                      Amount Invested: $ {item.asset.invested}
                    </div>
                    <div className="updateStocks">
                      Net Profit: $ {item.asset.netProfit}
                    </div>
                    <div className="updateStocks">
                      Quantity Purchased: {item.asset.quantity}
                    </div>
                    <div className="button">
                      <button
                        className="buymore"
                        onClick={(e) => openBuyModal(e, i)}
                      >
                        Buy More
                      </button>
                      <button className="sell" onClick={(e) => openModal(e, i)}>
                        Sell
                      </button>
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
            type="text"
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
          {hide === "error" ? <div className="time">You don't hab</div> : <></>}
        </div>
      </Modal>

      {/* -------------- modal for sell ------------- */}

      <Modal
        style={{ width: "fit-content" }}
        isOpen={sellmodal}
        onRequestClose={() => setNameModal(false)}
      >
        <div className="modalheader">
          <h1>Sell : {StockId[0]}</h1>
        </div>
        <hr />
        <div className="modalBody">
          <p>Max you can sell : {maxBuyStock}</p>
          <input
            type="text"
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

      {/* -------------- modal for username ------------- */}

      <Modal
        style={{ width: "fit-content" }}
        isOpen={namemodal}
        onRequestClose={() => setsellModal(false)}
      >
        <div className="modalheader">
          <h1>Change Username</h1>
        </div>
        <hr />
        <div className="modalBody">
          <input
            type="text"
            onChange={(e) => {
              nameChecker(e);
              setName(e.target.value);
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
          {stat === 400 || stat === 0 ? (
            <div className="time">{msg}</div>
          ) : (
            <div className="bought">
              Username should be of atleast 5 characters.
            </div>
          )}
          {stat === 500 ? (
            <div className="time">{msg}</div>
          ) : (
            <div className="bought">Username should be unique</div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Portfolio;
