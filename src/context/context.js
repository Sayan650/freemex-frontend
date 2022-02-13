import { useRef, useState, createContext, useEffect} from "react";

const { io } = require("socket.io-client");
  const StockContext = createContext(undefined);

function StockProvider({ children }) {

  const socketRef = useRef();
    const [data, setData] = useState([]);
useEffect(
    () => {
      // request for stocks
      const getstocks = async () => {
        const res = await fetch('/api/stocks')
        const result = await res.json()
        if (res.status === 200) {
          const t = result.Stocks.sort(function (a, b) {
            return a.id - b.id
          })
          setData(t)
        }

      }
      getstocks()
      // socket connection for stocks
      socketRef.current = io(`${process.env.REACT_APP_BACKEND_URL}`)
      socketRef.current.on('connection', () => {
        console.log("connection is done")
      })
      socketRef.current.on("connect_error", (err) => {
        console.log("connect error:", err.message);
      });
      socketRef.current.on("market", (res) => {
        const t = res.sort(function (a, b) {
          return a.id - b.id
        })
        setData(t)
      })
      return () => socketRef.current.disconnect()
    },
    []
  )

  return (
    <>
           <StockContext.Provider value={data}>
               { children }
        </StockContext.Provider>
    </>
  );
}

export { StockProvider, StockContext};