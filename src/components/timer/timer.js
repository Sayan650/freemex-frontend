import './timer.css'
import React, { useEffect, useState,useCallback } from 'react'

const Timer = () => {

    let date = new Date();
    const [clock, setClock] = useState('00:00:00')

    const intervals = setInterval(function () {
        getCountdown();
        if (localStorage.getItem('time')) {
            clearInterval(intervals);
        }
    }, 1000);

    const getCountdown = useCallback(()=> {

        const tf = new Date('Wed Jan 05 2022 13:01:13')
        var target_date = tf.getTime()
        var days, hours, minutes, seconds;
        
        // find the amount of "seconds" between now and target
        var current_date = new Date().getTime();
        var seconds_left = (target_date - current_date) / 1000;

        days = pad(parseInt(seconds_left / 86400));
        seconds_left = seconds_left % 86400;

        hours = pad(parseInt(seconds_left / 3600));
        seconds_left = seconds_left % 3600;

        minutes = pad(parseInt(seconds_left / 60));
        seconds = pad(parseInt(seconds_left % 60));

        // format countdown string + set tag value
        const html = [days, hours, + minutes, + seconds]
        setClock(html)
    },[])

    function pad(n) {
        return (n < 10 ? '0' : '') + n;
    }

    useEffect(() => {
        getCountdown();
    },[getCountdown])

    return (
        <div className="clock">
            <div id="countdown">
                <div id='tiles'>
                    <span>{clock[0]}</span>
                    <span>{clock[1]}</span>
                    <span>{clock[2]}</span>
                    <span>{clock[3]}</span>

                </div>
                <div className="labels">
                    <li>Days</li>
                    <li>Hours</li>
                    <li>Mins</li>
                    <li>Secs</li>
                </div>
            </div>
        </div>
    )
}


export default Timer