import { useEffect, useState } from "react";
import "./list.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/coffee/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("Error fetching data: " + error.message);
    }
  };

  const removeCoffee = async (coffeeId) => {
    try {
      const response = await axios.post(`${url}/api/coffee/remove`, {
        id: coffeeId,
      });
      if (response.data.success) {
        toast.success("Kava sėkmingai pašalinta");
        await fetchList();
      } else {
        toast.error("Klaida šalinant kavą.");
      }
    } catch (error) {
      toast.error("Klaida šalinant kavą: " + error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex_col">
      <p>Visų kavų sąrašas</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Vaizdas</b>
          <b>Vardas</b>
          <b>Kaina</b>
          <b>Veiksmas</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>€{item.price.toFixed(2)}</p>
              <p onClick={() => removeCoffee(item._id)} className="cursor">
                X
              </p>
            </div>
          ))
        ) : (
          <p>No coffee items found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
