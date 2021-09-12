import Background from "../src/components/background/background";
import ReactRouterSetup from "./Route";
import "../src/styles/global.css";
import Footer from "../src/components/footer/footer";

function App() {
  return (
    <>
      <div className="App">
        <Background />
        <ReactRouterSetup />
        <Footer />
      </div>
    </>
  );
}

export default App;
