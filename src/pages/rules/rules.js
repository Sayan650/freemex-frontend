import MetaDecorator from "../../components/metaDecorator/metaDecorator";
import "./rules.css";


function Rules() {
  return (
    <>
      <MetaDecorator
        title="Rules - Freemex"
      />
      <div className="rules" id="rules">
        
        <h1>Rules</h1>
        <div className="rules-list">
          <li>
          Freemex contest for Aarohan will begin at 7 PM on 7th March, 2024.
          </li>
          <li>
          Contest will end at 1:30 AM on 10th March, 2024.
          </li>
          <li>
          NASDAQ Opens at 7 PM and closed at 1:30 AM (IST). The price of stocks are updated only in this period.
      
          </li>
          <li>Learn more about NASDAQ Timings 
          <a
              href="https://www.nasdaq.com/stock-market-trading-hours-for-nasdaq"  style={{marginLeft : "10px"}}
            // target="_blank"
            >
               here
            </a>
            .
            </li>
          <li>Person with maximum total asset wins.</li>
          <li>
            A player must participate in fruitful trade atleast once in order to
            win.
          </li>
          <li>
          After buying a stock, a player has to wait for 10 minutes before he/she can sell that stock.
          </li>
        </div>
      </div>
    </>
  )
}

export default Rules;