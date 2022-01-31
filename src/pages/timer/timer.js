import "./timer.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Timer = () => {
  const [player, setPlayer] = useState(0);
  const getPlayer = async () => {
    const response = await fetch("/api/players");
    const player = await response.status;
    const play = await response.json();
    console.log(play);
    setPlayer(player);
    console.log(player);
  };

  const history = useHistory();
  // let date = new Date();
  const [clock, setClock] = useState("00:00:00");
  const [timer, setTimer] = useState("")
  
  useEffect(() => {
    const time = async()=>{
      const res = await fetch('/api/schedules', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
      })
      const result = await res.json();
      console.log(result);
      setTimer(result.schedule)
    }
   time()
  },[])


  useEffect(() => {
    getPlayer();
    console.log(player);
    let myInterval = setInterval(() => {
      const getCountdown = async () => {

        const start = new Date(timer.start).getTime();
        const end = new Date(timer.end).getTime();
        var current_date = Date.now();
        if (
          (current_date > start && current_date < new Date(end).getTime()) ||
          player === 401
        ) {
          history.push("/portfolio");
        }

        // console.log(start_time)
        
        if (start > current_date) {
          // tf = new Date(start);
          var target_date = start;
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
          const html = [days, hours, +minutes, +seconds];
          // console.log(seconds_left);
          setClock(html);
        }
        if (current_date > new Date(end)) {
          var end_date = parseInt(end);

          seconds_left = (current_date - end_date) / 1000;

          days = pad(parseInt(seconds_left / 86400));
          seconds_left = seconds_left % 86400;

          hours = pad(parseInt(seconds_left / 3600));
          seconds_left = seconds_left % 3600;

          minutes = pad(parseInt(seconds_left / 60));
          seconds = pad(parseInt(seconds_left % 60));

          const html = [days, hours, +minutes, +seconds];
          setClock(html);
        }
      };

      function pad(n) {
        return (n < 10 ? "0" : "") + n;
      }

      getCountdown();
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [history, player,timer]);

  return (
    <div className="clock">
      <div className="countdown">
        <div className="labelsTime">
          <li>{clock[0]}</li>
          <li>{clock[1]}</li>
          <li>{clock[2]}</li>
          <li>{clock[3]}</li>
        </div>
        <div className="labels">
          <li>Days</li>
          <li>Hours</li>
          <li>Mins</li>
          <li>Secs</li>
        </div>
      </div>
    </div>
  );
};

export default Timer;
