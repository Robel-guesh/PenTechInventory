import React, { useState, useEffect } from "react";

import GoodsDisplayCard from "./cards/GoodsDisplayCard";

import CartsDisplayData from "./cards/CartsDisplayData";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";
import OrderDataCard from "./cards/OrderDataCard";
function DisplayData() {
  const [cartData, setCartData] = useState([]);
  const [goodsData, setGoodsData] = useState([]);
  const [quantityData, setQuantityData] = useState([]);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [withdrawData, setWithdrawData] = useState([]);
  const [fetchedWithdrawData, setFetchedWithdrawData] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [totalPending, setTotalPending] = useState(0);
  const [totalApproved, setTotalApproved] = useState(0);
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalreturned, setTotalReturned] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGoods, setFilteredGoods] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderSearchTerm, setOrderSearchTerm] = useState("");
  const [orderSearchedData, setOrderSearchedData] = useState([]);
  const {
    backendUrl,
    translate,
    loggedUser,
    darkMode,
    defaultBackground,
    setTotalCart,
  } = useAppContext();

  const goodsRoute = "/goods";
  const purchaseRoute = "/purchase";
  const withdrawRoute = "/withdraw";
  const orderFilterList = [
    // { filter: "all", label: "All" },
    { filter: "isPending", label: "Pendding", count: totalPending },
    { filter: "isApproved", label: "Approved ", count: totalApproved },
    { filter: "isConfirmed", label: "Taken", count: totalConfirmed },
    { filter: "returned", label: "Returned", count: totalreturned },
  ];
  useEffect(() => {
    // axios.get(`${backendUrl}${goodsRoute}`).then((response) => {
    //   setQuantityData(response.data.data);
    // });
    axios.get(`${backendUrl}${purchaseRoute}`).then((response) => {
      setQuantityData(response?.data?.data);
    });
    axios.get(`${backendUrl}/category`).then((response) => {
      setCategories(response?.data?.data);
    });
    axios.get(`${backendUrl}/user`).then((response) => {
      setUserData(response?.data?.data);
    });
    // axios.get(`${backendUrl}${purchaseRoute}`).then((response) => {
    //   setGoodsData(response.data.data);
    // });
    axios.get(`${backendUrl}${goodsRoute}`).then((response) => {
      setGoodsData(response?.data?.data);
    });
    axios.get(`${backendUrl}${purchaseRoute}`).then((response) => {
      setPriceData(response?.data?.data); // Default to empty array if no data
    });
    fetchWithdrawData();
  }, [backendUrl]);
  // useEffect(() => {
  //   // filterWithdrawData();
  // });
  const fetchWithdrawData = () => {
    axios.get(`${backendUrl}${withdrawRoute}`).then((response) => {
      const data = response?.data?.data; // Default to empty array if no data
      setFetchedWithdrawData(data);
      setWithdrawData(data);
      // handleOrderFilter("returned");
    });
  };
  const applyFilter = () => {
    if (fetchedWithdrawData.length > 0) {
      setWithdrawData(handleOrderFilter("isPending")); // Filter after data is loaded
    }
  };
  useEffect(() => {
    // Apply filter only after data is fetched
    applyFilter();
    setTotalPending(handleOrderFilter("isPending").length);
    setTotalApproved(handleOrderFilter("isApproved").length);
    setTotalConfirmed(handleOrderFilter("isConfirmed").length);
    setTotalReturned(handleOrderFilter("returned").length);
  }, [fetchedWithdrawData]);

  useEffect(() => {
    if (goodsData) {
      handleSearch();
    }
  }, [searchTerm, goodsData, categoryFilter]);
  useEffect(() => {
    handleOrderSearch();
  }, [withdrawData, orderSearchTerm]);
  const handleOrderSearch = () => {
    let originalWithdrawData = [...withdrawData];
    let withdrawFilter;
    if (loggedUser.roleName === "user") {
      withdrawFilter = originalWithdrawData.filter((item) => {
        return item?.customerId?._id === loggedUser._id;
      });
    } else {
      withdrawFilter = originalWithdrawData;
    }
    let filtered = withdrawFilter.filter((item) => {
      return item?.customerName
        ?.toLowerCase()
        .includes(orderSearchTerm.toLowerCase());
    });
    setOrderSearchedData(filtered);
  };
  const handleSearch = () => {
    if (!goodsData) return;
    let filterCategory;
    if (categoryFilter.toLowerCase() === "all") {
      filterCategory = [...goodsData];
    } else {
      // console.log(categoryFilter);
      filterCategory = goodsData.filter((item) => {
        return (
          item?.catagoryId?.name.toLowerCase() === categoryFilter.toLowerCase()
        );
      });
    }
    let filtered = filterCategory.filter((item) => {
      return item?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredGoods(filtered);
  };
  const filterWithdrawData = () => {
    // Ensure fetchedWithdrawData is an array before attempting to filter
    if (!Array.isArray(fetchedWithdrawData)) {
      console.error("fetchedWithdrawData is not an array or is undefined");
      return;
    }

    let filteredData = [...fetchedWithdrawData];

    let withdrawFilter = withdrawData.filter((item) => {
      return item?.customerId?._id === loggedUser._id;
    });

    // Set withdrawData based on the user's admin status
    setWithdrawData(loggedUser.isAdmin ? filteredData : withdrawFilter);
  };
  const filterPhoto = (id) => {
    const customerPhoto = userData?.find((item) => item?._id === id);
    return customerPhoto?.photo[0];
  };
  // console.log("user", userData);
  const handleAddToCart = (itemName) => {
    const newCartData = [...cartData];
    !newCartData.includes(itemName) && newCartData.push(itemName);
    setCartData(newCartData);
    fetchWithdrawData();
    applyFilter();
    setTotalCart(newCartData.length);
  };

  const fetchQuantityAndShortageLevel = (goodsId) => {
    const item = priceData?.find((datas) => datas.id._id === goodsId);

    if (item) {
      return item;
    } else {
      return 0;
    }
  };

  const handleOrderFilter = (filterBy) => {
    // Check if fetchedWithdrawData is an array, return if not
    if (!Array.isArray(fetchedWithdrawData)) {
      console.error("fetchedWithdrawData is not an array or is undefined");
      return;
    }

    let filteredData = [...fetchedWithdrawData];
    // console.log(!loggedUser.isAdmin);
    if (
      loggedUser?.roleName?.name === "user"
      // !loggedUser.isAdmin
      // ||
      // loggedUser?.roleName?.name !== "store keeper" ||
      // loggedUser?.roleName?.name !== "store manager"
    ) {
      filteredData = filteredData.filter(
        (item) => item?.customerId?._id === loggedUser._id
      );
    } else {
      filteredData = [...fetchedWithdrawData];
    }
    switch (filterBy) {
      case "isApproved":
        filteredData = filteredData.filter(
          (data) => data.isPending && data.isApproved && !data.isConfirmed
        );
        break;
      case "isPending":
        filteredData = filteredData.filter(
          (data) => data.isPending && !data.isApproved && !data.isConfirmed
        );
        break;
      case "isConfirmed":
        filteredData = filteredData.filter(
          (data) =>
            data.isPending &&
            data.isConfirmed &&
            data.isApproved &&
            !data.returned
        );
        break;
      case "returned":
        filteredData = filteredData.filter((data) => data.returned);
        break;

      default:
        // If no filter, keep the original data
        break;
    }

    // Update the withdrawData state with the filtered data

    return filteredData;
    // setWithdrawData(filteredData);

    // Optionally log filtered data (not state directly, since setState is async)
    // console.log(filteredData);
  };
  // const handleOrderSearch=()=>{
  //   filteredData.filter((item)=>{item})
  // }

  // console.log(totalreturned);
  const handleCloseCartItem = (itemToRemove) => {
    setCartData((prevCartData) =>
      prevCartData.filter((item) => item._id !== itemToRemove._id)
    );
  };
  return (
    <div>
      {/* {cartData.length > 0 && ( */}
      <div className="d-flex flex-column w-100 justify-content-center p-2  align-items-center ">
        <div
          className="d-flex flex-wrap m-1 p-1 bg-warning rounded-2 "
          style={{ width: "fit-content" }}
        >
          {orderFilterList.map((items, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedFilterIndex(index),
                  // setWithdrawData(handleOrderFilter(items.filter));
                  setOrderSearchedData(handleOrderFilter(items.filter));
              }}
              className={` me-1 d-flex  p-1 pointer text-center text-dark   ${
                selectedFilterIndex === index
                  ? " border-bottom border-2 border-white bg-light text-dark rounded-2 "
                  : "bg-warning "
              }`}
              // style={{ minWidth: "100px" }}
            >
              <div className="position-relative">
                <span
                  // className="position-relative"
                  style={{ fontSize: "14px" }}
                >
                  {translate(items.label)}
                </span>
                {items.count > 0 && (
                  <span className=" floating ms-1 bg-danger text-white  ">
                    {items.count}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="form-group mb-1 d-flex gap-2 p-2 justify-content-center align-items-center">
          <input
            className="form-control "
            type="text"
            placeholder="Search user ..."
            value={orderSearchTerm}
            onChange={(e) => setOrderSearchTerm(e.target.value)}
            style={{ maxWidth: "300px" }}
          ></input>
          <span className="bi bi-search fs-5"></span>
        </div>

        <div className="m-2 goods-main-container  ">
          {/* {withdrawData &&
            withdrawData.map((datas, index) => ( */}
          {orderSearchedData &&
            orderSearchedData.map((datas, index) => (
              <div
                key={index}
                className="order-card shadow-lg
                
                
                "
              >
                <OrderDataCard
                  name={datas.goodsId.name}
                  qty={datas.qty}
                  goodsId={datas.goodsId}
                  max={datas.goodsId.qty}
                  fullWithdrawData={datas}
                  description={datas?.goodsId?.description}
                  userId={loggedUser}
                  customersPhoto={filterPhoto(datas?.customerId?._id)}
                  onFilter={fetchWithdrawData}
                  setWithdrawData={setWithdrawData}
                ></OrderDataCard>
              </div>
            ))}
        </div>
      </div>
      {/* )} */}
      {cartData.length > 0 && (
        <div
          className={`d-flex w-100 justify-content-center rounded-5 p-1 px-3 ${
            darkMode ? " text-white" : "bg-white text-dark"
          }`}
          //  className="bg-light  "
        >
          <span className="bi bi-cart  me-2   "></span>
          <div className="fw-light">{translate("your cart")}</div>
        </div>
      )}
      {cartData.length > 0 && (
        <div
          className={` ${darkMode ? " text-white" : "bg-white text-dark"}`}
          // className="bg-light p-2"
        >
          {
            <div className="m-2 goods-main-container">
              {cartData.map((datas, index) => (
                <div key={index}>
                  <CartsDisplayData
                    cardData={datas}
                    onClose={() => handleCloseCartItem(datas)} // Close cart item
                    onFilter={fetchWithdrawData}
                  />
                </div>
              ))}
            </div>
          }
        </div>
      )}
      {goodsData && (
        <div className="d-flex mt-5">
          <p className="w-100 text-center">
            {translate("select one of goods you want to take")}
          </p>
        </div>
      )}
      <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-4 gap-2 ">
        {/* <div className="form-group mb-1 d-flex gap-2 justify-content-center align-items-center">
          <label>{translate("Category")}</label>
          <select
            name="catagoryId"
            className="form-control"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value={"all"}>all</option>
            {categories &&
              categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div> */}
        <div className=" form-group">
          <button
            className=" form-control d-flex justify-content-between"
            onClick={() => setIsOpen(!isOpen)}
            style={{ width: "150px" }}
          >
            {categoryFilter || "Select Category"}
            <span className="bi bi-caret-down-fill"></span>
          </button>
          {isOpen && (
            <ul
              className={`${defaultBackground} d-flex flex-column  p-1 position-absolute bg-white  shadow-sm  pointer `}
              style={{ width: "150px", listStyle: "none" }}
            >
              <li
                className={`${defaultBackground} ${
                  categoryFilter === "all" && "bg-warning "
                } p-1`}
                onClick={() => {
                  setCategoryFilter("all"), setIsOpen(!isOpen);
                }}
              >
                All
              </li>
              {categories &&
                categories.map((cat) => (
                  <li
                    className={`${defaultBackground} ${
                      categoryFilter === cat.name && "bg-warning text-dark "
                    } p-1`}
                    key={cat._id}
                    onClick={() => {
                      setCategoryFilter(cat.name), setIsOpen(!isOpen);
                    }}
                  >
                    {cat.name}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="form-group mb-1 d-flex gap-2 p-2 justify-content-center align-items-center">
          <input
            className="form-control "
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "300px" }}
          ></input>
          <span className="bi bi-search fs-5"></span>
        </div>
      </div>
      <div className="m-2 goods-main-container">
        {filteredGoods &&
          filteredGoods.map((datas, index) => (
            <div key={index} className="card-container ">
              <GoodsDisplayCard
                cardData={datas}
                handleAddToCart={handleAddToCart}
                quantityDatas={fetchQuantityAndShortageLevel(datas._id)}
              ></GoodsDisplayCard>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DisplayData;
