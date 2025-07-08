import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import { AppContext, AppContextProvider } from "./context/AppContext";
import LoginRecruiter from "./components/LoginRecruiter";
import { useContext } from "react";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import 'quill/dist/quill.snow.css'
const App = () => {
  const { showRecruiterLogin } = useContext(AppContext);

  return (
    <div>
      <BrowserRouter>
        <>
          {showRecruiterLogin && <LoginRecruiter />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply-job/:id" element={<ApplyJob />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="add-job" element={<AddJob />} />
              <Route path="manage-jobs" element={<ManageJobs />} />
              <Route path="view-applications" element={<ViewApplications />} />
            </Route>
          </Routes>
        </>
      </BrowserRouter>
    </div>
  );
};

export default App;
