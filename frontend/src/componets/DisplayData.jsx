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
function DisplayData() {
  const [cartData, setCartData] = useState([]);
  const [goodsData, setGoodsData] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const { backendUrl, translate } = useAppContext();
  const goodsRoute = "/goods";
  const purchaseRoute = "/purchase";

  useEffect(() => {
    // axios.get(`${backendUrl}${goodsRoute}`).then((response) => {
    //   setGoodsData(response.data.data);
    // });
    axios.get(`${backendUrl}${purchaseRoute}`).then((response) => {
      setGoodsData(response.data.data);
    });
  }, [backendUrl]);

  const handleAddToCart = (itemName) => {
    const newCartData = [...cartData];
    !newCartData.includes(itemName) && newCartData.push(itemName);
    setCartData(newCartData);
    // console.log(cartData);
  };

  return (
    <div>
      {cartData.length > 0 && (
        <div className="d-flex w-100 justify-content-center p-2  ">
          <div className="bg-light d-flex  rounded-5 p-1 px-3 ">
            <span className="bi bi-cart  me-2   "></span>
            <div className="fw-light">{translate("your cart")}</div>
          </div>
        </div>
      )}
      <div className="bg-light p-2">
        {
          <div className="m-2 goods-main-container">
            {cartData &&
              cartData.map((datas, index) => (
                <div key={index}>
                  <CartsDisplayData cardData={datas}></CartsDisplayData>
                </div>
              ))}
          </div>
        }
      </div>
      {goodsData && (
        <div className="d-flex mt-5">
          <p className="w-100 text-center">
            {translate("select one of our product you want to buy")}
          </p>
        </div>
      )}
      <div className="m-2 goods-main-container">
        {goodsData &&
          goodsData.map((datas, index) => (
            <div key={index}>
              <GoodsDisplayCard
                cardData={datas}
                handleAddToCart={handleAddToCart}
              ></GoodsDisplayCard>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DisplayData;
