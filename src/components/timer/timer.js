import './timer.css'
import React, { useEffect, useState,useCallback } from 'react'
import { useHistory } from 'react-router-dom';

const Timer = () => {
    const history = useHistory();
    let date = new Date();
    const [clock, setClock] = useState('00:00:00')
    const [start_time,setStartTime] = useState('')
    const [end_time,setEndTime] = useState('')


    const intervals = setInterval(function () {
        getCountdown();
        if (localStorage.getItem('time')) {
            clearInterval(intervals);
        }
    }, 1000);

    const getCountdown = useCallback( async()=> {
        const start = localStorage.getItem('start')
        const end = localStorage.getItem('end')
        var current_date = new Date().getTime();

        // console.log(current_date > new Date(start) && current_date < new Date(end))
        if (current_date > new Date(start) && current_date < new Date(end)) {
            history.push('/')
        }

        // console.log(start_time)
        let tf = new Date('Sat Jan 08 2022 09:40:00 GMT+0530 (India Standard Time)')
        if (new Date(start)> current_date) {
             tf = new Date(start)
             var target_date = tf.getTime()
             var days, hours, minutes, seconds;
             
             // find the amount of "seconds" between now and target
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

             // yha pe start hone m itna time ha (is if vale m dal dena)

        }if (current_date > new Date(end)) {
            // console.log(new Date(current_date))
            tf = new Date(current_date)
            var end_date = new Date(end)
            var days, hours, minutes, seconds;
            var target_date = tf.getTime()

            var seconds_left = (target_date-end_date) / 1000;

            days = pad(parseInt(seconds_left / 86400));
             seconds_left = seconds_left % 86400;
     
             hours = pad(parseInt(seconds_left / 3600));
             seconds_left = seconds_left % 3600;
     
             minutes = pad(parseInt(seconds_left / 60));
             seconds = pad(parseInt(seconds_left % 60));


             const html = [days, hours, + minutes, + seconds]
             setClock(html)

             // yha pe end hogya ha (is if vale m dal dena)
        }

        

       
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