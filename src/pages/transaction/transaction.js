import React, { useRef, useEffect, useState, useCallback } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./transaction.css";
import MetaDecorator from "../../components/metaDecorator/metaDecorator";

function Transaction() {
  const inputRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const time = async () => {
      const res = await fetch("/api/schedules", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();
      var current_date = new Date().getTime();
      var end = new Date(result.schedule.end).getTime();
      var start = new Date(result.schedule.start).getTime();

      if (current_date < start || current_date > end) {
        window.location.href = "/timer";
      }
    };
    time();
  }, []);

  const [transaction, setTransaction] = useState([]);

  const getTransaction = useCallback(async () => {
    const response = await fetch("/api/transactions");
    const transaction = await response.json();
    console.log(transaction.transactions);
    setTransaction(transaction.transactions);
    setLoading(false);
  }, []);

  useEffect(() => {
    getTransaction();
  }, [getTransaction]);

  // player status
  const [player, setPlayer] = useState([]);
  const getPlayer = useCallback(async () => {
    const response = await fetch("/api/players");
    const player = await response.json();
    setPlayer(player.player);
  }, []);

  useEffect(() => {
    getPlayer();
  }, [getPlayer]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const searchValue = (e) => {
    // console.log(e.target.value);
    const filter = e.target.value.toLowerCase();

    document.querySelectorAll(".row").forEach((element) => {
      if (
        element.children[0].innerHTML.indexOf(filter) > -1 ||
        element.children[0].innerHTML.toLowerCase().indexOf(filter) > -1
      ) {
        element.style.display = "";
      } else {
        element.style.display = "none";
      }
    });
  };
  

  return (
    <>
      <MetaDecorator title="Transactions - Freemex" />
      <div className="Transaction">
        <div className="Transactionhead">
          <h1>Transaction</h1>
          <h2>
            Cash in your hand: $ <span>{player.valueInCash}</span>
          </h2>
          <div className="searchbox">
            <SearchIcon className="searchIcon" />
            <input
              type="text"
              ref={inputRef}
              onChange={(e) => {
                searchValue(e);
              }}
            />
          </div>
        </div>

        <div className="transactionBody">
          <div className="transactionTable">
            <div className="transactionTableHead">
            <li>Stock code</li>
              <li>Status</li>
              <li>Qty</li>

              <li>Price</li>
              <li>Gain/Loss</li>
            </div>
    
            {loading ? (
              <div className="loader">
                <h4>Loading...</h4>
              </div>
            ) : (
              <>
                {transaction.map((item, i) => {
                  return (
                    <div className="transactionTableBody" key={i}>
                      <div className="row">
                      <li>{item.Stock.code}</li>
                        <li className={item.type}>{item.type}</li>
                        <li>{item.quantity}</li>
                      
                        <li>${item.price}</li>
                        {/* <li className="sold">${item.netProfit}</li> */}
                        {item.netProfit < 0 ? (
                          <li className="sold"> {item.netProfit} </li>
                        ) : (
                          <li className="bought"> {item.netProfit} </li>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
