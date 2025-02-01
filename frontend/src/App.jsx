import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./componets/NavBar/NavBar";
import DisplayData from "./componets/DisplayData";
import { useAppContext } from "./contexts/AppContext";
import GoodForm from "./componets/forms/GoodForm";
import CategoryForm from "./componets/forms/CategoryForm";
import MeasurementForm from "./componets/forms/MeasurementForm";
import ReasonForm from "./componets/forms/ReasonForm";
import PurchaseForm from "./componets/forms/PurchaseForm";
import StatusForm from "./componets/forms/StatusForm";
import StoreForm from "./componets/forms/StoreForm";
import SupplierForm from "./componets/forms/SupplierForm";
import TypeForm from "./componets/forms/TypeForm";
import UserForm from "./componets/forms/UserForm";
import WithdrawForm from "./componets/forms/WithdrawForm";
import RoleForm from "./componets/forms/RoleForm";
import AdminDashboard from "./componets/admin/AdminDashboard";
import Login from "./componets/forms/LogIn";
import ReportCard from "./componets/cards/ReportCard";
function PrivateRoute({ children, paths }) {
  const { loggedUser } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser) {
      if (!loggedUser.isAdmin) navigate("/");
      else navigate(paths);
    }
    if (!loggedUser) {
      navigate("/login");
    }
  }, [loggedUser, navigate]);

  return loggedUser ? children : null;
}
function App() {
  const { defaultBackground } = useAppContext();
  return (
    <Router>
      <>
        <div className={defaultBackground}>
          <nav>
            <NavBar />
          </nav>
          <Routes>
            <Route path="/login" element={<Login />}></Route>

            <Route path="/" element={<DisplayData />}></Route>
            <Route
              path="/category"
              element={
                <PrivateRoute paths="/category">
                  <CategoryForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/report"
              element={
                <PrivateRoute paths="/report">
                  <ReportCard />
                </PrivateRoute>
              }
            />
            <Route
              path="/goods"
              element={
                <PrivateRoute paths="/goods">
                  <GoodForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/measurement"
              element={
                <PrivateRoute paths="/measurement">
                  <MeasurementForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/purchase"
              element={
                <PrivateRoute paths="/purchase">
                  <PurchaseForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/reason"
              element={
                <PrivateRoute paths="/reason">
                  <ReasonForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/status"
              element={
                <PrivateRoute paths="/status">
                  <StatusForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/store"
              element={
                <PrivateRoute paths="/store">
                  <StoreForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/supplier"
              element={
                <PrivateRoute paths="/supplier">
                  <SupplierForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/type"
              element={
                <PrivateRoute paths="/type">
                  <TypeForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRoute paths="/user">
                  <UserForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/withdraw"
              element={
                <PrivateRoute paths="/withdraw">
                  <WithdrawForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/role"
              element={
                <PrivateRoute paths="/role">
                  <RoleForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/adminDashboard"
              element={
                <PrivateRoute paths="/adminDashboard">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
          {/* <Route path="/category" element={<CategoryForm />}></Route>
            <Route path="/goods" element={<GoodForm />}></Route>
            <Route path="/measurement" element={<MeasurementForm />}></Route>
            <Route path="/purchase" element={<PurchaseForm />}></Route>
            <Route path="/reason" element={<ReasonForm />}></Route>
            <Route path="/status" element={<StatusForm />}></Route>
            <Route path="/store" element={<StoreForm />}></Route>
            <Route path="/supplier" element={<SupplierForm />}></Route>
            <Route path="/type" element={<TypeForm />}></Route>
            <Route path="/user" element={<UserForm />}></Route>
            <Route path="/withdraw" element={<WithdrawForm />}></Route>
            <Route path="/role" element={<RoleForm />}></Route>
            <Route path="/adminDashboard" element={<AdminDashboard />}></Route> */}
        </div>
      </>
    </Router>
  );
}

export default App;
