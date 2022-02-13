import Background from "../src/components/background/background";
import ReactRouterSetup from "./Route";
import "../src/styles/global.css";
import Footer from "../src/components/footer/footer";
import Nav from "./components/navbar/navbar";
import { StockProvider } from "./context/context";

function App() {

  return (
    <>
   
      <div className="App">
        <StockProvider>
        <Background />
        <Nav />
        <ReactRouterSetup />
        <Footer />
        </StockProvider>
      </div>
    </>
  );
}

export default App;
