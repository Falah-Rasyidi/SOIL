import { useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * 'finalPrice' and 'purchaseSummary' work exactly the same and similarly to
 * 'finalPrice' and 'CartItems' in Cart.js
 * @see Cart.js
 */
const Summary = (props) => {
  const navigate = useNavigate();

  let cart;
  function finalPrice(i) {
    const discount = cart.items[i].discount;
    const price = cart.items[i].price;
    const quantity = cart.items[i].quantity;
    const final = (price * (1 - discount / 100.0)).toFixed(2);

    if (discount > 0) {
      return (
        <p>
          <s className="text-danger">${price}</s> ${final}
          <span className="text-secondary">x {quantity}</span>
        </p>
      );
    } else {
      return (
        <p>
          ${price} <span className="text-secondary">x {quantity}</span>
        </p>
      );
    }
  }

  const purchaseSummary = () => {
    const rows = [];
    let afterDiscount = 0.0;
    let beforeDiscount = 0.0;

    for (let i = 0; i < cart.items.length; i++) {
      const discount = cart.items[i].discount;
      const price = cart.items[i].price.toFixed(2);
      const quantity = cart.items[i].quantity;
      const final = (price * (1 - discount / 100.0)).toFixed(2);
      const sum = final * quantity;

      rows.push(
        <tr key={i}>
          <th scope="row">{i + 1}</th>
          <td>{cart.items[i].name}</td>
          <td>{finalPrice(i)}</td>
          <td>${sum}</td>
        </tr>
      );

      afterDiscount += sum;
      beforeDiscount += price * quantity;
    }
    rows.push(
      <tr key="total">
        {/* Add unique key here */}
        <td colSpan="3" className="table-info"></td>
        <td className="table-info">${afterDiscount.toFixed(2)}</td>
        <td className="table-info"></td>
      </tr>
    );

    if (afterDiscount !== beforeDiscount) {
      rows.push(
        <tr key="savings">
          {/* Add unique key here */}
          <td colSpan="4" className="my-2 text-success font-weight-bold">
            You saved: ${(beforeDiscount - afterDiscount).toFixed(2)}!
          </td>
        </tr>
      );
    }

    return rows;
  };

  function returnHome(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <motion.div
      className="frame"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
    >
      <h2>Purchase Summary</h2>
      <hr />
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Item </th>
            <th scope="col">
              Price <span className="text-secondary">x Quantity</span>
            </th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>{purchaseSummary()}</tbody>
      </table>
      <form onSubmit={returnHome}>
        <input className="btn btn-primary" type="submit" value="Home" />
      </form>
    </motion.div>
  );
};

export default Summary;
