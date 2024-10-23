import { motion } from "framer-motion";

import { getShopItemPriceString } from "../../data/repository";

/**Component for the card format for each product
 *
 * @param {*} props
 * @returns JSX that displays a product
 */
const TextCard = (props) => {
  const { index, item, openShopItemBox } = props;
  const addToCart = props.addToCart;
  const buyNow = props.buyNow;

  const { fullPrice, discountedPrice, discountString } =
    getShopItemPriceString(item);
  return (
    <div>
      <motion.div
        className="carousel-image"
        whileHover={{ scale: 1.031 }}
        whileTap={{ scale: 1.1 }}
      >
        <motion.img
          whileHover={{ scale: 1.031 }}
          src={item.img_src}
          alt={item.name}
          onClick={() => openShopItemBox(index)}
        />
      </motion.div>

      <div>
        <h2>{item.product_name}</h2>
        {/* indicated price, including discount*/}
        <div className="textcard-price">
          <span className="dollar-sign">{discountedPrice.currency}</span>
          <span className="dollars">{discountedPrice.dollars}</span>
          <span className="cents">{discountedPrice.cents}</span>
          {/* if there is a discount, show full price as slashed */}
          {item.discount > 0 && (
            <>
              <span className="full-price-slashed">
                <span className="slashed-dollar-sign">
                  {fullPrice.currency}
                </span>
                <span className="slashed-dollars">{fullPrice.dollars}</span>
                <span className="slashed-cents">{fullPrice.cents}</span>
              </span>
              <span className="discount">{discountString}</span>
            </>
          )}
        </div>
      </div>
      <hr />
      <div className="card-content-details">
        {/* Tag content of text cards */}
        <div className="card-content-tags">
          <ul>
            {JSON.parse(item.tags).map((tag, tagIndex) => (
              <li key={tagIndex}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className="card-content-submit">
          {localStorage.getItem("user") !== null ? (
            // If shopitem does not have stock change add to cart to out of stock
            item.stock ? (
              <button
                className="btn btn-primary card-content-buttons"
                onClick={() => addToCart(item)}
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
          {localStorage.getItem("user") ? (
            // If shopitem does not have stock, remove buy now button
            item.stock ? (
              <button
                className="btn btn-warning card-content-buttons"
                onClick={() => buyNow(item)}
              >
                Buy Now
              </button>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default TextCard;
