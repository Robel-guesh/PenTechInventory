import React from "react";
import icon from "../assets/logo.png";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.jpeg";

function DisplayData() {
  const data = [
    {
      name: "computer",
      catagory: "electronics",
      Qty: 4,
      price: 500,
      photo: icon,
    },
    {
      name: "chanrger",
      catagory: "electronics",
      Qty: 10,
      price: 600,
      photo: image4,
    },
    {
      name: "chair",
      catagory: "furniture",
      Qty: 19,
      price: 500,
      photo: image3,
    },
    { name: "pen", catagory: "stationary", Qty: 4, price: 500, photo: image1 },
    {
      name: "pencil",
      catagory: "stationary",
      Qty: 4,
      price: 500,
      photo: image2,
    },
  ];
  return (
    <div className="m-2 goods-main-container">
      {data &&
        data.map((datas, index) => (
          <div key={index} className="goods-container">
            <div className="goods-img-container">
              <img src={datas.photo} alt="goods"></img>
            </div>
            <div className="d-flex justify-content-center align-items-ceneter gap-4">
              <div>
                <div>{datas.name}</div>
                <div>{datas.Qty}</div>
                <div>{datas.price}</div>
                <div>{datas.catagory}</div>
              </div>
              <div> 4 </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default DisplayData;
