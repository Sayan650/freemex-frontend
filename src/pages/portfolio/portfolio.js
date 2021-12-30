import "./portfolio.css"
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import React, { useState, useCallback, useEffect } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')


const Portfolio = () => {

    const [BUYmodal, setbuyModal] = useState(false)
    const [sellmodal, setsellModal] = useState(false)

    const openModal = (e) => {
        if (e.target.innerHTML === "Buy More") {
            setbuyModal(true)
        } if (e.target.innerHTML === "Sell") {
            setsellModal(true)
        }
    }
    const closeModal = (e) => {
        setbuyModal(false)
        setsellModal(false)
    }

           const [player, setPlayer] = useState([]);
  const getPlayer = useCallback(async () => {
    const response = await fetch('/api/players');
        const player = await response.json();
    setPlayer(player.player);
  }, []);

  useEffect(() => {
    getPlayer();
  }, [getPlayer]);

    return (
        <div className="portfolio">
            <div className="portfoliopage">
                <div className="heading">
                    <h1>Portfolio</h1>
                </div>
                <div className="body">
                    <div className="card">
                        <p>Cash: $ <span>{player.valueInCash}</span></p>
                        <p>Value in Stock : $ <span>{player.valueInStocks}</span></p>
                        <p className="total" >Total : $ <span>{player.valueInTotal}</span></p>
                    </div>
                    <div className="msg">
                        <p>Page last updated on : <span>8888</span></p>
                    </div>

                </div>
                <div className="stockDetails">
                    <h2>Your Stocks</h2>
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
                                <div className="button">
                                    <button className="buymore" onClick={(e) => openModal(e)}>Buy More</button>
                                    <button className="sell" onClick={(e) => openModal(e)}>Sell</button>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="market">
                        <button className="marketbtn">Buy Stocks</button>
                    </div>
                </div>
            </div>


            {/* -------------- modal for buy More ------------- */}

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

            {/* -------------- modal for sell ------------- */}


            <Modal style={{ width: 'fit-content' }} isOpen={sellmodal} onRequestClose={() => setsellModal(false)}>
                <div className="modalheader">
                    <h1>Sell : Apple Inc.</h1>
                </div>
                <hr />
                <div className="modalBody">
                    <input type="number" />
                </div>
                <hr />
                <div className="modalFooter">
                    <button className="buy">Sell</button>
                    <button className="close" onClick={(e) => closeModal(e)} >Cancel</button>
                </div>
            </Modal>
        </div>
    )
}

export default Portfolio