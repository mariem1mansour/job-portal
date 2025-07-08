import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import { AppContext, AppContextProvider } from "./context/AppContext";
import LoginRecruiter from "./components/LoginRecruiter";
import { useContext } from "react";
const App = () => {
const {showRecruiterLogin} = useContext(AppContext)

  return (
    <div>
    <BrowserRouter>
      <>
    { showRecruiterLogin && <LoginRecruiter/>}
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
