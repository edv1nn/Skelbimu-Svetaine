import styles from "./add.module.css";
import { assets } from "../../images/assets.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/coffee/add`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          description: "",
          price: "",
        });
        setImage(false);
      }
    } catch (error) {
      toast.error("Error adding coffee");
    }
  };

  return (
    <div className="add">
      <form className={styles.flex_col} onSubmit={onSubmitHandler}>
        <div className={styles.add_img_upload}>
          <p>Įkelti paveikslėlį</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className={`${styles.add_product_name} flex_col`}>
          <p>Produkto pavadinimas</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Įveskite čia"
            required
          />
        </div>
        <div className={`${styles.add_product_description} flex_col`}>
          <p>Produkto Aprašymas</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Rašykite turinį čia"
            required
          />
        </div>
        <div className={`${styles.add_price} flex_col`}>
          <p>Produkto kaina</p>
          <input
            onChange={onChangeHandler}
            value={data.price}
            type="number"
            name="price"
            placeholder="20€"
            required
          />
        </div>
        <button type="submit" className={styles.add_btn}>
          Pridėti
        </button>
      </form>
    </div>
  );
};

export default Add;
