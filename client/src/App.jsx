import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import { AppContextProvider } from "./context/AppContext";
const App = () => {
  return (
    <div>
    <BrowserRouter>
      <>
          <Routes>
            <Route path="/" element={ <Home/>}/>
            <Route path="/apply-job/:id" element={<ApplyJob/>} />
            <Route path = "/applications" element={<Applications/>} />
          </Routes>
      </>
    </BrowserRouter>
    </div>
  );
};

export default App;
