import "./navbar.css"

const Nav = () => {
    return (
        <div className="navbar">
            <div className="nav">
                <div className="links">
                    <a href="/portfolio">Portfolio</a>
                </div>
                <div className="links">
                    <a href="/market">Market</a>
                </div>
                <div className="links">
                    <a href="/transactions">Transaction</a>
                </div>
                <div className="links">
                    <a href="/leaderboard">leaderboard</a>
                </div>
                <div className="links">
                    <a href="/logout">Logout</a>
                </div>
            </div>
        </div>
    )
}

export default Nav