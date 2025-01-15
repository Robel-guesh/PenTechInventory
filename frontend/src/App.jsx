import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
            <Route path="/" element={<DisplayData />}></Route>
            <Route path="/category" element={<CategoryForm />}></Route>
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
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
