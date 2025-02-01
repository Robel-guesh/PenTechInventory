import GoodForm from "../forms/GoodForm";
import CategoryForm from "../forms/CategoryForm";
import MeasurementForm from "../forms/MeasurementForm";
import ReasonForm from "../forms/ReasonForm";
import RoleForm from "../forms/RoleForm";
import TypeForm from "../forms/TypeForm";
import StatusForm from "../forms/StatusForm";
import StoreForm from "../forms/StoreForm";
import UserForm from "../forms/UserForm";
import SupplierForm from "../forms/SupplierForm";
import PurchaseForm from "../forms/PurchaseForm";
import WithdrawForm from "../forms/WithdrawForm";
export const formList = {
  category: (
    <CategoryForm
      oldData={selectedItem}
      onSave={() => fetchDataByRoute("category")}
    />
  ),
  measurement: (
    <MeasurementForm
      oldData={selectedItem}
      onSave={() => fetchDataByRoute("measurement")}
    />
  ),
  reason: (
    <ReasonForm
      oldData={selectedItem}
      onSave={() => fetchDataByRoute("reason")}
    />
  ),
  role: (
    <RoleForm oldData={selectedItem} onSave={() => fetchDataByRoute("role")} />
  ),
  type: (
    <TypeForm
      oldData={selectedItem}
      onSave={() => fetchDataByRoute("type")}
    ></TypeForm>
  ),
  status: (
    <StatusForm
      oldData={selectedItem}
      onSave={() => fetchDataByRoute("status")}
    />
  ),
  store: (
    <StoreForm
      oldData={selectedItem}
      onSave={() => fetchDataByRoute("store")}
    />
  ),
  supplier: (
    <SupplierForm
      oldData={selectedItem}
      onSave={() => fetchDataByRoute("supplier")}
    />
  ),
  purchase: (
    <PurchaseForm
      oldData={selectedItem}
      onSave={() => fetchDataByRoute("purchase")}
    />
  ),

  goods: (
    <GoodForm oldData={selectedItem} onSave={() => fetchDataByRoute("goods")} />
  ),
  user: (
    <UserForm oldData={selectedItem} onSave={() => fetchDataByRoute("user")} />
  ),
  withdraw: (
    <WithdrawForm
      oldData={selectedItem}
      onSave={() => fetchDataByRoute("withdraw")}
    />
  ),
};
