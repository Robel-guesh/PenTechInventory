import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table, Form, Pagination } from "react-bootstrap";
import { useAppContext } from "../../contexts/AppContext";
import { NavLink, useNavigate } from "react-router-dom";
import { paths } from "../paths";
import {
  withdrawHeader,
  userHeader,
  goodsHeader,
  categoryHeader,
  purchaseHeader,
  supplierHeader,
  storeHeader,
  // typeHeader,
  // purchaseHeader,
  measurementHeader,
} from "../Headers";
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
function AdminDashboard() {
  const { backendUrl, translate } = useAppContext();
  const sideBarPaths = paths;
  const [sidebarSelection, setSidebarSelection] = useState("goods");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Initialize as an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalMode, setModalMode] = useState(""); // 'view' or 'edit'
  const [tableHeader, setTableHeader] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  const formList = {
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
      <RoleForm
        oldData={selectedItem}
        onSave={() => fetchDataByRoute("role")}
      />
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
      <GoodForm
        oldData={selectedItem}
        onSave={() => fetchDataByRoute("goods")}
      />
    ),
    user: (
      <UserForm
        oldData={selectedItem}
        onSave={() => fetchDataByRoute("user")}
      />
    ),
    withdraw: (
      <WithdrawForm
        oldData={selectedItem}
        onSave={() => fetchDataByRoute("withdraw")}
      />
    ),
  };
  // Fetch data based on sidebar selection
  const fetchDataByRoute = async (exactPath) => {
    const response = await axios.get(`${backendUrl}/${exactPath}`);
    // console.log("selected path", exactPath, response.data);
    setSidebarSelection(exactPath);
    setData(response?.data?.data);
    // console.log("withdrawData", data);
    if (exactPath === "user") {
      setTableHeader(userHeader);
    }
    if (exactPath === "withdraw") {
      setTableHeader(withdrawHeader);
    }
    if (exactPath === "goods") {
      setTableHeader(goodsHeader);
    }
    if (exactPath === "purchase") {
      setTableHeader(purchaseHeader);
    }
    if (exactPath === "measurement") {
      setTableHeader(measurementHeader);
    }
    if (exactPath === "supplier") {
      setTableHeader(supplierHeader);
    }
    if (exactPath === "store") {
      setTableHeader(storeHeader);
    }

    if (
      exactPath === "category" ||
      exactPath === "type" ||
      exactPath === "role" ||
      exactPath === "reason" ||
      exactPath === "status"
    ) {
      setTableHeader(categoryHeader);
    }
  };
  const fetchData = async () => {
    try {
      let response;
      response = await axios.get(`${backendUrl}/goods`);
      setTableHeader(goodsHeader);
      setData(response?.data?.data); // Assuming the response structure is { data: [...] }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Use useEffect to trigger data fetch when sidebarSelection changes
  useEffect(() => {
    fetchData();
  }, [backendUrl]);

  // Update filteredData whenever searchTerm or filterStatus changes
  useEffect(() => {
    if (data) {
      handleSearch();
    }
  }, [searchTerm, filterStatus, data]);

  // Handle search
  const handleSearch = () => {
    if (!data) return;

    // Filter only items that have a name property and handle cases where `name` is undefined
    let filtered = data.filter((item) => {
      return (
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.goodsId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.id?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.storeLocationId?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    });
    let withdrawFilter = filtered.filter((item) => {
      item?.filterStatus === true;
    });

    setFilteredData(
      // filterStatus.length > 0 && sidebarSelection === "withdraw"
      //   ? withdrawFilter
      //   :
      filtered
    );
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle Add or Edit item
  const handleModalClose = () => setShowModal(false);

  const handleModalOpen = (mode, item = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleEditSave = async (itemId, updatedData) => {
    console.log(itemId);
    // Logic for saving the edited item
    try {
      if (window.confirm("are you sure you want to update this file?")) {
        await axios.put(
          `${backendUrl}/${sidebarSelection}/${itemId}`,
          updatedData
        );
      }
      // fetchData(); // Refresh data
      fetchDataByRoute(sidebarSelection);
    } catch (error) {
      console.error("Error updating item:", error.message);
    }

    // setShowModal(false);
  };
  const handleVerification = async (verification, itemId) => {
    try {
      await axios.put(`${backendUrl}/${sidebarSelection}/${itemId}`, {
        isVerified: verification,
      });
      fetchDataByRoute(sidebarSelection);
    } catch (error) {
      console.error("Error updating item:", error.message);
    }
  };
  const handleWithdrawApproval = async (itemId) => {
    try {
      await axios.put(`${backendUrl}/${sidebarSelection}/approve/${itemId}`);
      fetchDataByRoute(sidebarSelection);
    } catch (error) {
      console.error("Error updating item:", error.message);
    }
  };
  const handleWithdrawConfirmation = async (itemId) => {
    try {
      await axios.put(`${backendUrl}/${sidebarSelection}/confirm/${itemId}`);
      fetchDataByRoute(sidebarSelection);
    } catch (error) {
      console.error("Error updating item:", error.message);
    }
  };

  const handleAdminUpdate = async (isAdmin, itemId) => {
    try {
      await axios.put(`${backendUrl}/${sidebarSelection}/${itemId}`, {
        isAdmin: isAdmin,
      });
      fetchDataByRoute(sidebarSelection);
    } catch (error) {
      console.error("Error updating item:", error.message);
    }
  };
  const handleDelete = async (itemId) => {
    // Handle Delete operation

    try {
      if (window.confirm("are you sure you want to delete this file?")) {
        await axios.delete(`${backendUrl}/${sidebarSelection}/${itemId}`);
      }
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };
  // const goToPage = () => {
  //   console.log(sidebarSelection);
  //   navigate(`/${sidebarSelection}`);
  // };
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="sidebar">
            <ul className="list-unstyled  ">
              {sideBarPaths &&
                sideBarPaths.map((sidePath, index) => (
                  <li
                    key={index}
                    className={` ps-2 my-1 p-1 py-1 pointer  ${
                      currentIndex === index ? "bg-warning" : "bg-white"
                    }`}
                    onClick={() => (
                      fetchDataByRoute(sidePath.routePath),
                      setCurrentIndex(index)
                    )}
                    // style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                  >
                    {sidePath.label}
                  </li>
                ))}
              {/* Add other sidebar items like category, type, status, etc. */}
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <div className="main-bar">
            <h3>
              {sidebarSelection.charAt(0).toUpperCase() +
                sidebarSelection.slice(1)}
            </h3>

            <div className="row  justify-content-between my-3 gap-2 ">
              <div className="col-md-4 ">
                <Form.Control
                  // className="me-2"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "300px" }}
                />
              </div>

              <div className="col-md-5">
                {sidebarSelection === "withdraw" && (
                  <Form.Group className="d-flex gap-2">
                    <Form.Label>Filter by Status</Form.Label>
                    <div className=" gap-2">
                      <Form.Check
                        type="radio"
                        label="Pending"
                        value="isPending"
                        checked={filterStatus === "isPending"}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      />
                      <Form.Check
                        type="radio"
                        label="Approved"
                        value="isApproved"
                        checked={filterStatus === "isApproved"}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      />
                      <Form.Check
                        type="radio"
                        label="Confirmed"
                        value="isConfirmed"
                        checked={filterStatus === "isConfirmed"}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                )}
              </div>
            </div>
            <div className=" m-2 d-flex align-items-center justify-content-end  ">
              <NavLink
                // onClick={goToPage}
                to={`/${sidebarSelection}`}
                className="bi bi-plus bg-primary circle-button"
                style={{ width: "50px", height: "50px" }}
              ></NavLink>
            </div>
            <div className="overflowX-scroll">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {tableHeader &&
                      tableHeader.map((headers, index) => (
                        <th key={index}>{headers.label}</th>
                      ))}
                    {sidebarSelection === "user" && (
                      <th>{translate("Admin")}</th>
                    )}
                    {sidebarSelection === "user" && (
                      <th>{translate("Verified")}</th>
                    )}
                    {sidebarSelection === "withdraw" && (
                      <th>{translate("Pendding")}</th>
                    )}
                    {sidebarSelection === "withdraw" && (
                      <th>{translate("Approved")}</th>
                    )}
                    {sidebarSelection === "withdraw" && (
                      <th>{translate("Taken")}</th>
                    )}

                    <th>{translate("Actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems &&
                    currentItems.map((item, index) => (
                      <tr key={index}>
                        {tableHeader &&
                          tableHeader.map((headers, index) => (
                            // <td key={index}>
                            //   {item[headers.path] || item[headers.path?.name]}
                            // </td>
                            <td key={index}>
                              {/* Check if the property is a foreign key or nested */}
                              {headers.path.includes(".")
                                ? headers.path
                                    .split(".")
                                    .reduce(
                                      (acc, part) => acc && acc[part],
                                      item
                                    )
                                : item[headers.path]}
                            </td>
                          ))}
                        {sidebarSelection === "user" && (
                          <td>
                            <span>
                              <span
                                onClick={() =>
                                  handleAdminUpdate(!item.isAdmin, item._id)
                                }
                                // variant="warning"
                                className={`bi  fs-4 pointer p-2 me-2   ${
                                  item.isAdmin
                                    ? "text-primary bi-person-check"
                                    : "text-danger bi-person-fill-x"
                                }`}
                              ></span>
                            </span>
                          </td>
                        )}
                        {sidebarSelection === "user" && (
                          <td>
                            <span>
                              <span
                                onClick={() =>
                                  handleVerification(!item.isVerified, item._id)
                                }
                                // variant="warning"
                                className={`bi  fs-4 pointer p-2 me-2   ${
                                  item.isVerified
                                    ? "text-success bi-person-check"
                                    : "text-danger bi-person-fill-x"
                                }`}
                              ></span>
                            </span>
                          </td>
                        )}
                        {sidebarSelection === "withdraw" && (
                          <td>
                            <span>
                              <span
                                // variant="warning"
                                className={`bi  fs-4 pointer p-2 me-2   ${
                                  item.isPending
                                    ? "text-success bi-check"
                                    : "text-danger bi-x"
                                }`}
                              ></span>
                            </span>
                          </td>
                        )}
                        {sidebarSelection === "withdraw" && (
                          <td>
                            <span>
                              <span
                                // variant="warning"
                                onClick={() =>
                                  item.isApproved === false &&
                                  handleWithdrawApproval(item._id)
                                }
                                className={`bi  fs-4 pointer p-2 me-2   ${
                                  item.isApproved
                                    ? "text-success bi-check"
                                    : "text-danger bi-x"
                                }`}
                              ></span>
                            </span>
                          </td>
                        )}
                        {sidebarSelection === "withdraw" && (
                          <td>
                            <span>
                              <span
                                // variant="warning"
                                onClick={() =>
                                  item.isConfirmed === false &&
                                  handleWithdrawConfirmation(item._id)
                                }
                                className={`bi  fs-4 pointer p-2 me-2   ${
                                  item.isConfirmed
                                    ? "text-success bi-check"
                                    : "text-danger bi-x"
                                }`}
                              ></span>
                            </span>
                          </td>
                        )}
                        <td>
                          <span
                            className="bi bi-eye-fill pointer p-2"
                            // variant="primary"
                            onClick={() => handleModalOpen("view", item)}
                          ></span>{" "}
                          <span
                            // variant="warning"
                            className="bi bi-pencil-fill pointer p-2 "
                            onClick={() => handleModalOpen("edit", item)}
                          ></span>{" "}
                          <span
                            // variant="warning"
                            className="bi bi-trash-fill pointer p-2 text-danger"
                            onClick={() => handleDelete(item._id)}
                          ></span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
              />
              {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map(
                (_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                )
              )}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </Pagination>
          </div>
        </div>
      </div>

      {/* Modal for View or Edit */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "edit" ? "Edit Item" : "View Item"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMode === "view" ? (
            <div>
              <p>Name: {selectedItem?.name}</p>
              {/* Add more details as necessary */}
            </div>
          ) : (
            formList[sidebarSelection]
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
