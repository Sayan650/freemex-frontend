import React, { useState} from "react";
import "./admin.css"
import Modal from "react-modal";




function Admin() {
    const [BUYmodal, setbuyModal] = useState(true);
    const [hide,setHide] = useState("");
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [start_time,setStartTime] = useState("");
    const [end_time,setEndTime] = useState("");

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
            }else{
                setbuyModal(false);
                setHide("")
            }
        }
    };

    const timer = async ()=> {
        if (start_time && end_time) {
            console.log(start_time, end_time)        
            const res = await fetch('/admin/api/schedules',{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(
                 {
                    instance :{
                        start: start_time,end: end_time
                    }
                 })
            })
            // console.log(res)
        }
    }


    return (
        <div className="admin">

            <div className={`timer ${hide}`}>
                <form >
                    <div>
                        <label htmlFor="start_date"><h4 >Start Date and Time</h4></label>
                        <input type="datetime-local" onChange={(e)=>setStartTime(e.target.value)} className="starttime" />
                    </div>
                    <div >
                        <label htmlFor="start_time"><h4 >End Date and Time</h4></label>
                        <input type="datetime-local" onChange={(e)=>setEndTime(e.target.value)} className="endtime" />
                    </div>
                    <button className="submit" onClick={timer} type="button">Submit</button>
                </form>
            </div>

            <Modal
                style={{ width: "fit-content" }}
                isOpen={BUYmodal}
                className="Modal"
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

export default Admin;