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
import "quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import Chat from "./components/ChatBot";
import DashboardChat from "./components/DashboardChat";

const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <div>
      <BrowserRouter>
        <>
          {showRecruiterLogin && <LoginRecruiter />}
          <ToastContainer />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Chat />
                </>
              }
            />
            <Route path="/apply-job/:id" element={<ApplyJob />} />

            <Route path="/applications" element={<Applications />} />
            <Route path="/dashboard" element={<Dashboard />}>
              {companyToken ? (
                <>
                  <Route path="add-job" element={<AddJob />} />
                  <Route path="manage-jobs" element={<ManageJobs />} />
                  <Route
                    path="view-applications"
                    element={<ViewApplications />}
                  />
                </>
              ) : null}
            </Route>
          </Routes>
          {companyToken && <DashboardChat />}
        </>
      </BrowserRouter>
    </div>
  );
};

export default App;
