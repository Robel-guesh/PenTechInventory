import React, { useState, useEffect } from "react";
// import icon from "../assets/logo.png";
// import image1 from "../assets/image1.png";
// import image2 from "../assets/image2.png";
// import image3 from "../assets/image3.png";
// import image4 from "../assets/image4.png";
// import image5 from "../assets/image5.png";
import GoodsDisplayCard from "./cards/GoodsDisplayCard";
import getGoodsData from "../sampleData/goodsData";
import CartsDisplayData from "./cards/CartsDisplayData";
function DisplayData() {
  const [cartData, setCartData] = useState([]);
  const [goodsData, setGoodsData] = useState([]);
  // setGoodsData(getGoodsData());
  useEffect(() => {
    // getGoodsData();

    // return () => {
    setGoodsData(getGoodsData());
    // };
  }, []);

  const handleAddToCart = (itemName) => {
    const newCartData = [...cartData];
    !newCartData.includes(itemName) && newCartData.push(itemName);
    setCartData(newCartData);
    // console.log(cartData);
  };

  return (
    <div>
      <div className="d-flex ">
        <h3 className="w-100 text-center">your cart</h3>
      </div>
      <div>
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
      <div className="d-flex mt-5">
        <h3 className="w-100 text-center">
          select one of our product you want to buy
        </h3>
      </div>
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
