import React, { useRef, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./transaction.css";

function Transaction() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div className="Transaction">
        <div className="Transactionhead">
          <h1>Transaction</h1>
          <h2>
            Cash in your hand: $<span>0</span>
          </h2>
          <div className="searchbox">
            <SearchIcon className="searchIcon" />
            <input type="text" ref={inputRef} />
          </div>
        </div>
        <div className="transactionBody">
          <div className="transactionTable">
            <div className="transactionTableHead">
              <li>Stock name</li>
              <li>Status</li>
              <li>Qty</li>
              <li>Stock code</li>
              <li>Price</li>
              <li>Gain/Loss</li>
            </div>
            <div className="transactionTableBody">
              <div className="row">
                <li>Apple Inc.</li>
                <li className="sold">Sold</li>
                <li>3</li>
                <li>AAPL</li>
                <li>$152.51</li>
                <li className="sold">$0.00</li>
              </div>
            </div>
            <div className="transactionTableBody">
              <div className="row">
                <li>Apple Inc.</li>
                <li className="brought">Brought</li>
                <li>3</li>
                <li>AAPL</li>
                <li>$152.51</li>
                <li className="brought">$0.00</li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
