import Background from "../src/components/background/background";
import ReactRouterSetup from "./Route";
import "../src/styles/global.css";

function App() {
  return (
    <>
      <div className="App">
        <Background />
        <ReactRouterSetup />
      </div>
    </>
  );
}

export default App;
