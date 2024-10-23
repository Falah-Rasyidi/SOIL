import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";

import { getShopItemPriceString, getCurrentUser } from "../../data/repository";
import { currentSessionContext } from "../../contexts/currentSessionContext";
import { ReviewPagination } from "../shop";

/**
 *
 * @param {*} props
 * @returns {jsx} for modal shop item pop up
 */
const ShopItemBox = (props) => {
  // const { setNotif } = useContext(currentSessionContext);

  const { item, handleClose } = props;
  const [quantity, setQuantity] = useState(1);

  const buyNow = props.buyNow;
  const addToCart = props.addToCart;

  const { fullPrice, discountedPrice, discountString } =
    getShopItemPriceString(item);

  return (
    <motion.div
      onClick={handleClose}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.7,
        },
      }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="popup-box"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
          transition: {
            duration: 10,
            type: "spring",
            damping: 40,
            stiffness: 250,
          },
        }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <div className="box-row-product">
          <div className="box-col-left">
            <div className="box-image">
              <img src={item.img_src} alt={item.name} />
            </div>
          </div>
          <div className="box-description">
            <div className="box-col-right">
              <h1>{item.product_name}</h1>
              <hr></hr>
              <ul>
                {JSON.parse(item.tags).map((tag, tagIndex) => (
                  <li key={tagIndex}>{tag}</li>
                ))}
              </ul>
              <p>{item.description}</p>
            </div>
            <form className="box-form">
              {/* indicated price, including discount*/}
              <div className="box-price">
                <span className="dollar-sign">{discountedPrice.currency}</span>
                <span className="dollars">{discountedPrice.dollars}</span>
                <span className="cents">{discountedPrice.cents}</span>
                {/* if there is a discount, show full price as slashed */}
                {item.discount > 0 && (
                  <>
                    <span className="full-price-slashed-white">
                      <span className="slashed-dollar-sign">
                        {fullPrice.currency}
                      </span>
                      <span className="slashed-dollars">
                        {fullPrice.dollars}
                      </span>
                      <span className="slashed-cents">{fullPrice.cents}</span>
                    </span>
                    <span className="discount">{discountString}</span>
                  </>
                )}
              </div>
              {/* Quantity */}
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                id="input"
              />
              {/* Add to cart button */}
              {getCurrentUser() !== null ? (
                item.stock ? (
                  <button
                    type="button"
                    className="btn btn-primary card-content-buttons"
                    onClick={() => addToCart(item, quantity)}
                    value="Add to Cart"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button className="btn btn-secondary" disabled>
                    Out of Stock
                  </button>
                )
              ) : (
                <button className="btn btn-secondary" disabled>
                  Log in to purchase
                </button>
              )}
              {/* Buy now button */}
              {getCurrentUser() !== null ? (
                item.stock ? (
                  <button
                    type="button"
                    className="btn btn-warning card-content-buttons"
                    onClick={() => buyNow(item, quantity)}
                  >
                    Buy Now
                  </button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
        <div className="box-row-review">
          <div className="box-row-review-title">
            <div className="box-row-review-title-items">
              <h4>Reviews</h4>
              {/* Write review button */}
              <Button
                size="small"
                variant="text"
                sx={{ textTransform: "none", color: "#4392F1" }}
              >
                <span>Write review</span>
              </Button>
            </div>

            <hr></hr>
          </div>
          <ReviewPagination />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShopItemBox;
