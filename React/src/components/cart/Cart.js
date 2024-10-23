import { useState, useEffect, useContext } from "react";
import { ThreeDots } from "react-loading-icons";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { currentSessionContext } from "../../contexts/currentSessionContext";
import { getUserProducts, getCurrentUser } from "../../data/repository";
import { CartItems } from "../cart";

/**
 *
 * @param {*} props
 * @returns {jsx} for shopping cart
 */
const Cart = (props) => {
  const { notification, setNotif } = useContext(currentSessionContext);
  const [items, setItems] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  useEffect(() => {
    const getUsersProducts = async () => {
      const cartItems = await getUserProducts(
        JSON.parse(localStorage.getItem("user")).user_id
      );
      // setItems(items);
      setCartItems(cartItems);
    };

    getUsersProducts();
  }, []);

  const { closeCartBox } = props;

  const currentUser = JSON.parse(getCurrentUser());
  // const items = getUserProducts(
  //   JSON.parse(localStorage.getItem("user")).user_id
  // );
  const onChangeCart = (user_id) => {
    setCartItems(getUserProducts(user_id));
  };

  return (
    <div className="frame-cart">
      <h1>Hi, {currentUser.username}</h1>
      <h2>This is your cart:</h2>
      <table className="table table-borderless">
        {/* table header for each cart item */}
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Item </th>
            <th scope="col">
              Price <span className="text-secondary">x Quantity</span>
            </th>
            <th scope="col">Total</th>
            <th scope="col"></th>
          </tr>
        </thead>
        {/* Cart items */}

        {cartItems === null ? (
          <>
            {/* Loading icon */}
            <ThreeDots />
          </>
        ) : (
          <tbody>
            <CartItems cartItems={cartItems} onChangeCart={onChangeCart} />
          </tbody>
        )}
      </table>
      {/* Purchase button */}
      {items !== null ? (
        <Link
          to="/purchase"
          className="text-white checkout-button"
          onClick={closeCartBox}
        >
          <Button>Proceed to Checkout</Button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
