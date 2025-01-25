import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table, Form, Pagination } from "react-bootstrap";
import { useAppContext } from "../../contexts/AppContext";
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

  // Fetch data based on sidebar selection
  const fetchDataByRoute = async (exactPath) => {
    const response = await axios.get(`${backendUrl}/${exactPath}`);
    // console.log("selected path", exactPath);
    // console.log("selected header", selectedHeader);
    // console.log(userHeader);

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
    setSidebarSelection(exactPath);
    setData(response?.data?.data);
  };
  const fetchData = async () => {
    try {
      let response;
      response = await axios.get(`${backendUrl}/goods`);
      setTableHeader(goodsHeader);
      // setTableHeader(withdrawHeader);

      // switch (sidebarSelection) {
      // case "category":
      //   response = await axios.get(`${backendUrl}/category`);
      //   setTableHeader(categoryHeader);
      // case "goods":
      // break;
      // case "users":
      //   response = await axios.get(`${backendUrl}/user`);
      //   setTableHeader(userHeader);

      //   break;
      // case "withdraw":
      //   response = await axios.get(`${backendUrl}/withdraw`);
      //   setTableHeader(withdrawHeader);
      //   break;

      // Add other cases for different sections (categories, suppliers, etc.)
      // default:
      //   break;
      // }
      setData(response?.data?.data); // Assuming the response structure is { data: [...] }
      console.log("initial data", response?.data?.data);
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
    console.log("other data", data);
    // Filter only items that have a name property and handle cases where `name` is undefined
    let filtered = data.filter((item) => {
      return item?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // if (filterStatus) {
    //   filtered = filtered.filter((item) => item.status === filterStatus);
    // }

    setFilteredData(filtered);
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

  const handleEditSave = async (itemId) => {
    // Logic for saving the edited item
    try {
      if (window.confirm("are you sure you want to update this file?")) {
        await axios.put(`${backendUrl}/${sidebarSelection}/${itemId}`);
      }
      // fetchData(); // Refresh data
      fetchDataByRoute(sidebarSelection);
    } catch (error) {
      console.error("Error updating item:", error.message);
    }

    // setShowModal(false);
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
                    className=" ps-2 my-1 p-1 py-1 pointer "
                    onClick={() => fetchDataByRoute(sidePath.routePath)}
                    style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
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
            <div className="overflow-scroll">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {tableHeader &&
                      tableHeader.map((headers, index) => (
                        <th key={index}>{headers.label}</th>
                      ))}
                    <th>{translate("Actions")}</th>
                    {sidebarSelection === "users" && (
                      <th>{translate("Verified")}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {currentItems &&
                    currentItems.map((item, index) => (
                      <tr key={index}>
                        {tableHeader &&
                          tableHeader.map((headers, index) => (
                            <td key={index}>{item[headers.path]}</td>
                          ))}
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
                        <td>
                          {sidebarSelection === "users" && (
                            <span>
                              <span
                                // variant="warning"
                                className={`bi  fs-4 pointer p-2 me-2   ${
                                  item.isVerified
                                    ? "text-success bi-person-check"
                                    : "text-danger bi-person-fill-x"
                                }`}
                              ></span>
                            </span>
                          )}
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
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" defaultValue={selectedItem?.name} />
              </Form.Group>
              {/* Add other fields for editing */}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          {modalMode === "edit" && (
            <Button
              variant="primary"
              onClick={() => handleEditSave(selectedItem?._id)}
            >
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
