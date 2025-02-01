import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import ReportDetail from "./ReportDetail";

function ReportCard() {
  const { backendUrl, loggedUser, translate } = useAppContext();
  const [goodsData, setGoodsData] = useState([]);
  const [withdrawData, setWithdrawData] = useState([]);
  const [cardIsOpen, setCardIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const fetchData = async () => {
    try {
      const [fetchedGoods, fetchedWithdraw] = await Promise.all([
        axios.get(`${backendUrl}/goods`),
        axios.get(`${backendUrl}/withdraw`),
      ]);
      setGoodsData(fetchedGoods.data.data);
      setWithdrawData(fetchedWithdraw.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, [backendUrl]);

  const totalWithdraw = withdrawData.length;
  // console.log(withdrawData);
  const handleFilter = (filterStatus) => {
    if (!goodsData) return;

    let filtered = [...goodsData];
    let totalData = 0;
    if (filterStatus === "all") {
      filtered = [...goodsData];
    } else if (filterStatus === "inStock") {
      filtered?.forEach((element) => {
        totalData = Number(totalData) + Number(element?.qty);
      });

      filtered = filtered.filter((item) => item?.qty > item.shortageLevel);
    } else if (filterStatus === "critical") {
      filtered = filtered.filter(
        (item) => item?.qty <= item.shortageLevel && item?.qty > 0
      );
    } else if (filterStatus === "outOfStock") {
      filtered = filtered.filter((item) => item?.qty <= 0);
    }
    return { filtered, totalData };
  };
  const filterTotalWithdraw = (reason) => {
    let total = 0;
    let totalWithdrawnData = withdrawData.filter(
      (item) => item.reasonId.name === reason
    );
    withdrawData?.forEach((element) => {
      total =
        Number(total) + Number(element.reasonId.name === reason && element.qty);
    });
    return { total, totalWithdrawnData };
  };
  //   console.log(handleFilter("all"));
  // console.log(filterTotalWithdraw());
  const cardList = [
    // {
    //   header: "total Stock",
    //   qty: handleFilter("all").length,
    //   detail: false,
    //   //   list: handleFilter("all"),
    // },

    {
      header: "Available Stock",
      qty: handleFilter("inStock").totalData,
      list: handleFilter("inStock").filtered,
      detail: true,
    },
    {
      header: "Out of Stock",
      qty: handleFilter("outOfStock").filtered.length,
      list: handleFilter("outOfStock").filtered,
      detail: true,
    },
    {
      header: "Reorder level",
      qty: handleFilter("critical").filtered.length,
      list: handleFilter("critical").filtered,
      detail: true,
    },
    {
      header: "withdrawn ",
      qty: filterTotalWithdraw("internal use").total,
      list: filterTotalWithdraw("internal use").totalWithdrawnData,
      detail: true,
    },
    {
      header: "Sold",
      qty: filterTotalWithdraw("sale").total,
      list: filterTotalWithdraw("sale").totalWithdrawnData,
      detail: true,
    },
    {
      header: "withdrawn as gift",
      qty: filterTotalWithdraw("gift").total,
      list: filterTotalWithdraw("gift").totalWithdrawnData,
      detail: true,
    },
  ];
  return (
    <div className="p-2 ">
      <div className=" d-flex flex-wrap justify-content-center gap-4">
        {cardList &&
          cardList.map((items, index) => (
            <div
              key={items.header}
              className=" rounded-2  shadow-sm report-card overflow-hidden"
            >
              <div
                className="d-flex justify-content-center align-items-center w-100 fw-bold fs-5 bg-warning  text-center p-2"
                // style={{ minHeight: "50%" }}
              >
                {translate(items?.header)}
              </div>
              <div
                className="d-flex justify-content-center align-items-center   fw-bolder fs-1 p-2"
                // style={{ minHeight: "50%" }}
              >
                {items?.qty}
              </div>
              <ReportDetail
                items={items}
                qty={items.qty}
                detail={items.detail}
              ></ReportDetail>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ReportCard;
