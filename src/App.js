import Background from "../src/components/background/background";
import ReactRouterSetup from "./Route";
import "../src/styles/global.css";
import Footer from "../src/components/footer/footer";
import Nav from "./components/navbar/navbar";
import React from 'react';



function App() {
  return (
    <>
      <div className="App">
        <Background />
        <Nav />
        <ReactRouterSetup />
        <Footer />
      </div>
    </>
  );
}

export default App;
