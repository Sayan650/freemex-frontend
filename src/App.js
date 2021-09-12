import Background from "../src/components/background/background";
import ReactRouterSetup from "./Route";
import "../src/styles/global.css";
import Nav from "./components/navbar/navbar"

function App() {
  return (
    <>
      <div className="App">
        <Background />
        <Nav/>
        <ReactRouterSetup />
      </div>
    </>
  );
}

export default App;
