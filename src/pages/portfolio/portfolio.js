import "./portfolio.css"


const Portfolio = () => {
    return (
        <div className="foliocont">
            <div className="heading">
                <h1>Portfolio</h1>
            </div>
            <div className="body">
                <div className="card">
                    <p>Cash: $ <span>8888</span></p>
                    <p>Value in Stock : $ <span>8888</span></p>
                    <p style={{ borderTop: "2px solid rgb(43, 13, 112)" }}>Total : $ <span>8888</span></p>
                </div>
                <div className="msg">
                    <p>Page last updated on : <span>8888</span></p>
                </div>
                <div className="stockDetails">
                    <h2>Your Stocks</h2>
                    <div className="stockscard">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Portfolio