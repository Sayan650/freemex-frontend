import React, { useState } from "react";
import "./admin.css"
import Modal from "react-modal";
import MetaDecorator from "../../components/metaDecorator/metaDecorator";




function Dashboard() {
    const [BUYmodal, setbuyModal] = useState(true);
    const [hide, setHide] = useState("hide");
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");
    const [data, setData] = useState([])
    const [instance, setInstance] = useState();
    const [method, setMethod] = useState();
    const [options, setOptions] = useState();

    const Loginadmin = async (e) => {
        console.log(!username, !password)
        if (username && password) {
            const res = await fetch('/auth/admin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username, password
                })
            })
            // const result = await res.json()
            console.log(res)
            if (res.status !== 200) {
                return 0
            } else {
                setbuyModal(false);
                setHide("")
            }
        }
    };

    const timer = async () => {
        if (start_time && end_time) {
            console.log(start_time, end_time)
            const res = await fetch('/admin/api/schedules', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(
                    {
                        instance: {
                            start: start_time, end: end_time
                        }
                    })
            })
            console.log(res);
        }
    }


    const getData = async (e) => {
        console.log(e.target.className)
        const item = e.target.className
        const name = e.target.innerText
        const response = await fetch(`/admin/api/${item}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        });
        const player = await response.json();
        console.log(player[name])
        setData([player[name], name])
    }

    const someRoute = async ()=>{
        console.log(instance,options,method)
        const response = await fetch(`/admin/api/${method}`,{
            method: method,
            headers:{
                "content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                instance,options
            })
        })
        const player = await response.json()
        console.log(player)
    }


    return (
        <div className="admin">
            <MetaDecorator
                title="Admin - Freemex"
                description="An admin page to create schedules (or timer)"
            />
            <div className={`timer ${hide}`}>
                <div className="schedule">
                    <form >
                        <div>
                            <label htmlFor="start_date"><h4 >Start Date and Time</h4></label>
                            <input type="datetime-local" onChange={(e) => setStartTime(new Date(e.target.value).getTime())} className="starttime" />
                        </div>
                        <div >
                            <label htmlFor="start_time"><h4 >End Date and Time</h4></label>
                            <input type="datetime-local" onChange={(e) => setEndTime(new Date(e.target.value).getTime())} className="endtime" />
                        </div>
                        <button className="submit" onClick={timer} type="button">Submit</button>
                    </form>
                </div>


                <div className="other">
                    <div className="menu">
                        <button className="players" onClick={(e) => { getData(e) }}>Player</button>
                        <button className="assets" onClick={(e) => { getData(e) }}>Asset</button>
                        <button className="transactions" onClick={(e) => { getData(e) }}>Transaction</button>
                        <button className="stockss" onClick={(e) => { getData(e) }}>Stock</button>
                    </div>

                    <div className="otherRequest">
                        <div>
                            <textarea type="text" placeholder="Instance" onChange={(e)=>setInstance(e.target.value)}/>
                        </div>
                        <div>
                            <textarea type="text" placeholder="Options" onChange={(e)=>setOptions(e.target.value)}/>
                        </div>
                        <div>
                            <select name="method" onClick={(e)=>setMethod(e.target.value)}>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                                <option value="DELETE">DELETE</option>
                            </select>
                        </div>
                        <div>
                            <button type="button" onClick={someRoute}>Submit</button>
                        </div>
                    </div>

                    {/* ----------------------------for players------------------------------- */}

                    <div className="adminTable">
                        <div className="adminTableHead">
                            {data.length > 0 ?
                                [
                                    data[1] === "Player" ? <div className="row" key={1}>
                                        <li className="id">#</li>
                                        <li >Name</li>
                                        <li >uuid</li>
                                        <li >value In Cash</li>
                                        <li >value In Stocks</li>
                                        <li >value In Total</li>
                                        <li >Updated At</li>
                                        <li >Email</li>
                                    </div> : null
                                ] : null}

                        </div>
                        <div className="adminTableBody">
                            {data.length > 0 ?
                                [
                                    data[1] === "Player" ? [
                                        data[0].map((item, i) => {
                                            return <div className="row" key={i}>
                                                <li className="id">{item.id}</li>
                                                <li>{item.name}</li>
                                                <li>{item.uuid}</li>
                                                <li>{item.valueInCash}</li>
                                                <li>{item.valueInStocks}</li>
                                                <li>{item.valueInTotal}</li>
                                                <li>{item.updatedAt}</li>
                                                <li>{item.email}</li>
                                            </div>
                                        })
                                    ] : null
                                ] : null}

                        </div>
                    </div>



                    {/*------------------------------------- for assets-------------------------------------------- */}
                    <div className="adminTable">
                        <div className="adminTableHead">
                            {data.length > 0 ?
                                [
                                    data[1] === "Asset" ? <div className="row" key={1}>
                                        <li className="id">#</li>
                                        <li >PlayerId</li>
                                        <li >StockId</li>
                                        <li >invested</li>
                                        <li >netProfit</li>
                                        <li >quantity</li>
                                        <li >updatedAt</li>
                                        <li >createdAt</li>
                                    </div> : null
                                ] : null}

                        </div>
                        <div className="adminTableBody">
                            {data.length > 0 ?
                                [
                                    data[1] === "Asset" ? [
                                        data[0].map((item, i) => {
                                            return <div className="row" key={i}>
                                                <li className="id">{i + 1}</li>
                                                <li>{item.PlayerId}</li>
                                                <li>{item.StockId}</li>
                                                <li>{item.invested}</li>
                                                <li>{item.netProfit}</li>
                                                <li>{item.quantity}</li>
                                                <li>{item.updatedAt}</li>
                                                <li>{item.createdAt}</li>
                                            </div>
                                        })
                                    ] : null
                                ] : null}

                        </div>
                    </div>


                    {/*------------------------------ for transaction------------------------------ */}

                    <div className="adminTable">
                        <div className="adminTableHead">
                            {data.length > 0 ?
                                [
                                    data[1] === "Transaction" ? <div className="row" key={1}>
                                        <li className="id">#</li>
                                        <li >PlayerId</li>
                                        <li >StockId</li>
                                        <li >price</li>
                                        <li >netProfit</li>
                                        <li >quantity</li>
                                        <li >updatedAt</li>
                                        <li >createdAt</li>
                                    </div> : null
                                ] : null}

                        </div>
                        <div className="adminTableBody">
                            {data.length > 0 ?
                                [
                                    data[1] === "Transaction" ? [
                                        data[0].map((item, i) => {
                                            return <div className="row" key={i}>
                                                <li className="id">{i + 1}</li>
                                                <li>{item.PlayerId}</li>
                                                <li>{item.StockId}</li>
                                                <li>{item.price}</li>
                                                <li>{item.netProfit}</li>
                                                <li>{item.quantity}</li>
                                                <li>{item.updatedAt}</li>
                                                <li>{item.createdAt}</li>
                                            </div>
                                        })
                                    ] : null
                                ] : null}

                        </div>
                    </div>


                    {/*------------------------------ for stocks------------------------------ */}

                    <div className="adminTable">
                        <div className="adminTableHead">
                            {data.length > 0 ?
                                [
                                    data[1] === "Stock" ? <div className="row" key={1}>
                                        <li className="id">#</li>
                                        <li >Name</li>
                                        <li >Code</li>
                                        <li >Latest Price</li>
                                        <li >Change</li>
                                        <li >Change Percent</li>
                                        <li >Latest Update</li>
                                        <li >Updated At</li>
                                    </div> : null
                                ] : null}

                        </div>
                        <div className="adminTableBody">
                            {data.length > 0 ?
                                [
                                    data[1] === "Stock" ? [
                                        data[0].map((item, i) => {
                                            return <div className="row" key={i}>
                                                <li className="id">{i + 1}</li>
                                                <li>{item.name}</li>
                                                <li>{item.code}</li>
                                                <li>{item.latestPrice}</li>
                                                <li>{item.change}</li>
                                                <li>{item.changePercent}</li>
                                                <li>{item.latestUpdate}</li>
                                                <li>{item.updatedAt}</li>
                                            </div>
                                        })
                                    ] : null
                                ] : null}

                        </div>
                    </div>

                </div>
            </div>

            <Modal
                style={{ width: "fit-content" }}
                isOpen={BUYmodal}
                className="ModalAdmin"
            >
                <div className="modalheader">
                    <div className="adminhead">
                        <h1>Admin Login</h1>
                    </div>
                    <div className="modalBody">
                        <div className="adminform">
                            <form action="/admin" method="POST">
                                <input type="email" onInput={(e) => setUsername(e.target.value)} placeholder="Enter you email" />
                                <input type="password" onInput={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                                <button type="button" onClick={Loginadmin}>Login</button>
                            </form>
                        </div>
                    </div>

                </div>
            </Modal>

        </div>
    )
}

export default Dashboard;