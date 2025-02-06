import React, { useState, useEffect } from "react";
// import icon from "../assets/logo.png";
// import image1 from "../assets/image1.png";
// import image2 from "../assets/image2.png";
// import image3 from "../assets/image3.png";
// import image4 from "../assets/image4.png";
// import image5 from "../assets/image5.png";
import GoodsDisplayCard from "./cards/GoodsDisplayCard";
// import getGoodsData from "../sampleData/goodsData";
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
  const { backendUrl, translate, loggedUser } = useAppContext();

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
      setQuantityData(response.data.data);
    });
    axios.get(`${backendUrl}/user`).then((response) => {
      setUserData(response.data.data);
    });
    // axios.get(`${backendUrl}${purchaseRoute}`).then((response) => {
    //   setGoodsData(response.data.data);
    // });
    axios.get(`${backendUrl}${goodsRoute}`).then((response) => {
      setGoodsData(response.data.data);
    });
    axios.get(`${backendUrl}${purchaseRoute}`).then((response) => {
      setPriceData(response.data.data || []); // Default to empty array if no data
    });
    fetchWithdrawData();
  }, [backendUrl]);
  // useEffect(() => {
  //   // filterWithdrawData();
  // });
  const fetchWithdrawData = () => {
    axios.get(`${backendUrl}${withdrawRoute}`).then((response) => {
      const data = response.data.data || []; // Default to empty array if no data
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
  const filterWithdrawData = () => {
    // Ensure fetchedWithdrawData is an array before attempting to filter
    if (!Array.isArray(fetchedWithdrawData)) {
      console.error("fetchedWithdrawData is not an array or is undefined");
      return;
    }

    let filteredData = [...fetchedWithdrawData];

    // Check if loggedUser is not an admin and filter based on customerId
    let withdrawFilter = withdrawData.filter((item) => {
      return item?.customerId?._id === loggedUser._id; // Filter based on the loggedUser's ID
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
    // console.log(cartData);
  };
  // const handleFilter = (itemName) => {
  //   const newCartData = [...cartData];
  //   newCartData.filter(item=>!item.itemName);
  //   setCartData(newCartData);
  //   // console.log(cartData);
  // };
  const fetchQuantityAndShortageLevel = (goodsId) => {
    // const item = quantityData?.find((data) => data._id === goodsId);

    // if (item) {
    //   return {
    //     qty: item.qty,
    //     shortageLevel: item.shortageLevel,
    //   };
    // } else {
    //   return { qty: 0, shortageLevel: 0 }; // Return default values if not found
    // }

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

    // Start with the original fetchedWithdrawData
    let filteredData = [...fetchedWithdrawData];

    // Filter based on logged user if they're not an admin
    if (!loggedUser.isAdmin) {
      filteredData = filteredData.filter(
        (item) => item?.customerId?._id === loggedUser._id
      );
    }

    // Apply the filter based on the filterBy parameter
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

  console.log(totalreturned);
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
                  setWithdrawData(handleOrderFilter(items.filter));
              }}
              className={` mx-1 d-flex  p-1 pointer text-center   ${
                selectedFilterIndex === index
                  ? " border-bottom border-2 border-dark"
                  : "bg-warning "
              }`}
              // style={{ minWidth: "100px" }}
            >
              {translate(items.label)}
              {items.count > 0 && (
                <span className=" ms-1 bg-white  px-2 rounded-circle ">
                  {items.count}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="m-2 goods-main-container  ">
          {withdrawData &&
            withdrawData.map((datas, index) => (
              <div key={index} className="order-card">
                <OrderDataCard
                  name={datas.goodsId.name}
                  qty={datas.qty}
                  goodsId={datas.goodsId._id}
                  fullWithdrawData={datas}
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
        <div className="bg-light d-flex w-100 justify-content-center rounded-5 p-1 px-3 ">
          <span className="bi bi-cart  me-2   "></span>
          <div className="fw-light">{translate("your cart")}</div>
        </div>
      )}
      {cartData.length > 0 && (
        <div className="bg-light p-2">
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
      <div className="m-2 goods-main-container">
        {goodsData &&
          goodsData.map((datas, index) => (
            <div key={index} className="card-container">
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
