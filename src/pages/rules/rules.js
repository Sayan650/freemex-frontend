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
            Freemex contest for Aarohan will begin at 8PM on 29 March 2021.
          </li>
          <li>
            NASDAQ Opens at 7PM and closes at 1.30AM (IST). The price of stocks
            are updated only in this period.
          </li>
          <li>
            Learn more about NASDAQ Timings{" "}
            <a
              href="http://www.nasdaq.com/about/trading-schedule.aspx"
            // target="_blank"
            >
              here
            </a>
            .
          </li>
          <li>Contest will end at 12AM on 1 April 2021.</li>
          <li>Person with maximum total asset wins.</li>
          <li>
            A player must participate in fruitful trade atleast once in order to
            win.
          </li>
        </div>
      </div>
    </>
  )
}

export default Rules;