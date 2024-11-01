import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

function FoodCard(props) {
  let data = useCart();
  let dispatch = useDispatchCart();
  let priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItems = props.foodItem;
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const handleAddtoCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItems._id) {
        food = item;
        break;
      }
    }

    if (food != []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItems._id,
          price: finalPrice,
          qty: quantity,
        });
        await alert("Updated in Cart");
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItems._id,
          name: foodItems.name,
          price: finalPrice,
          qty: quantity,
          size: size,
        });
        // console.log(data)
        alert("Added to cart");
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: foodItems._id,
      name: foodItems.name,
      price: finalPrice,
      qty: quantity,
      size: size,
    });
    alert("Added to cart");
  };

  let finalPrice = quantity * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ maxWidth: "20rem", maxHeight: "440px" }}
        >
          <img
            src={foodItems.img}
            className="card-img-top"
            alt="Foody options"
            style={{ width: "100%", height: "180px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{foodItems.name}</h5>
            <p className="card-text">Khana Khao aur so jao</p>
            <div className="container w-100 gap-5">
              <select
                className="m-2 h-100 bg-danger rounded"
                onChange={(e) => setQuantity(e.target.value)}
              >
                {Array.from(Array(5), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {" "}
                      {i + 1}{" "}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2 h-100 bg-danger rounded"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline fs-5">₹{finalPrice}/-</div>
            </div>
            <hr />
            <button
              className="btn btn-danger text-white ms-2 justify-center"
              onClick={handleAddtoCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
