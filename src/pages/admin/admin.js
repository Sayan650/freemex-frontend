import React from 'react';
import "./admin.css"




function Admin() {

    return(
        <div className="admin">
            <div className="adminhead">
            <h1>Admin Login</h1>
            </div>
            <div className="adminform">
            <form action="/admin" method="POST">
                <input type="email" placeholder="Enter you email" />
                <input type="password" placeholder="Enter your password" />
            </form>
            </div>

        </div>
    )
}

export default Admin;