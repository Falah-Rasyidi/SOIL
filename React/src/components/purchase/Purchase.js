import { useState, useContext } from "react";

import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";

import { currentSessionContext } from "../../contexts/currentSessionContext";

/**
 *
 * @param {*} props
 * @returns {jsx} for purchase page
 */
const Purchase = (props) => {
  const { setNotif } = useContext(currentSessionContext);

  const [CCNumber, setCCNumber] = useState("");
  const [date, setDate] = useState(dayjs(Date()));

  const navigate = useNavigate();

  // Generic change handler
  function onChangeNumber(e) {
    setCCNumber(e.target.value);
  }

  // Luhn's algorithm
  // From https://www.geeksforgeeks.org/luhn-algorithm/
  const checkLuhn = (cardNo) => {
    let nDigits = cardNo.length;
    let nSum = 0;
    let isSecond = false;

    for (let i = nDigits - 1; i >= 0; i--) {
      let d = cardNo[i].charCodeAt() - "0".charCodeAt();

      if (isSecond == true) {
        d = d * 2;
      }

      nSum += parseInt(d / 10, 10);
      nSum += d % 10;

      isSecond = !isSecond;
    }

    return nSum % 10 == 0;
  };

  // Checks that input date has not passed yet
  // From https://www.freecodecamp.org/news/javascript-date-comparison-how-to-compare-dates-in-js/
  const validDate = (inputDate, currentDate) => {
    let date1 = new Date(inputDate).getTime();
    let date2 = new Date(currentDate).getTime();

    if (date1 > date2) {
      return true;
    }

    return false;
  };

  function onSubmit(e) {
    e.preventDefault();

    if (checkLuhn(CCNumber) && validDate(date, Date())) {
      setNotif("purchase");
      navigate("/summary");

      return;
    }
  }

  return (
    <div className="frame">
      <h2>Enter Details</h2>
      <hr />
      <form className="purchase" onSubmit={onSubmit}>
        <div>
          <label className="control-label">Card number</label>
          <input
            type="number"
            className="form-control"
            value={CCNumber}
            onChange={onChangeNumber}
          />
        </div>
        <div>
          <label className="control-label">Expiration date</label>
          <br />
          <DatePicker
            label={"MM YYYY"}
            views={["month", "year"]}
            value={date}
            onChange={(newDate) => setDate(newDate)}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Buy now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Purchase;
