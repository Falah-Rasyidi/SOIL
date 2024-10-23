import { useContext } from "react";
import { currentSessionContext } from "../../contexts/currentSessionContext";
import { finalPrice } from "../Helpers";

import { deleteItem } from "../../data/repository";

/**Cart items represented in table. Placed into array which is returned.
 *
 * @param {*} props
 * @param {*} param1
 * @returns jsx for formatted shop items, to be displayed on the cart page and cart dropdown box
 */
const CartItems = (props, { onChangeCart }) => {
  const { notification, setNotif } = useContext(currentSessionContext);
  const cartItems = props.cartItems;
  const user_id = JSON.parse(localStorage.getItem("user")).user_id;

  const rows = [];
  let total = 0;
  let count = 0;
  for (const cartItem of cartItems) {
    const discount = cartItem.discount;
    const price = parseFloat(cartItem.price).toFixed(2);
    const quantity = cartItem.quantity;
    const final = (price * (1 - discount / 100.0)).toFixed(2);
    const sum = final * quantity;

    rows.push(
      <tr key={count}>
        {/* Use the loop index i to generate unique keys */}
        <th scope="row">{count + 1}</th>
        <td>{cartItem.product_name}</td>
        <td>{finalPrice(cartItem)}</td>
        <td>${sum.toFixed(2)}</td>
        <td className="checkout-button">
          <button
            className="btn btn-danger cart-remove"
            onClick={async () =>
              (await deleteItem(user_id, cartItem.product_id)) /
              onChangeCart(user_id)
            }
          >
            &#10005;
          </button>
        </td>
      </tr>
    );

    total += sum;
    count++;
    localStorage.setItem("CART", JSON.stringify(cartItems));
  }

  rows.push(
    <tr key="total">
      <td colSpan="3" className="table-info"></td>
      <td className="table-info">${total.toFixed(2)}</td>
      <td className="table-info"></td>
    </tr>
  );

  return rows;
};

export default CartItems;
