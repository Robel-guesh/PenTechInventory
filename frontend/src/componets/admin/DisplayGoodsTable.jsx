import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function DisplayGoodsTable() {
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/goods")
      .then((response) => setGoods(response.data.data))
      .catch((error) => console.error("There was an error!", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/goods/${id}`)
      .then(() => {
        setGoods(goods.filter((good) => good._id !== id));
      })
      .catch((error) => console.error("Error deleting good", error));
  };
  return (
    <div>
      <h2>Goods</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Good ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Unit of Measure</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {goods.map((good) => (
            <tr key={good._id}>
              <td>{good.id}</td>
              <td>{good.name}</td>
              <td>{good.catagoryId?.name}</td>
              <td>{good.unitOfMeasureId?.name}</td>
              <td>{good.qty}</td>
              <td>
                <Link
                  to={`/admin/good/${good._id}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(good._id)}
                  className="btn btn-danger ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin/good" className="btn btn-primary">
        Create New Good
      </Link>
    </div>
  );
}

export default DisplayGoodsTable;
