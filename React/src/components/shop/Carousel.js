import React, { useState, useRef, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { TextCard, ShopItemBox } from "../shop";
import { currentSessionContext } from "../../contexts/currentSessionContext";
import { cartAddItem, searchUser } from "../../data/repository";

/**Carousel component that displays cards/boxes for display
 *
 * @param {*} props
 * @returns JSX that displays cards/boxes
 */
const Carousel = (props) => {
  // Props parameters that define carousel
  const { setNotif } = useContext(currentSessionContext);
  const { title, shopItemsRange, shopItems } = props;
  const navigate = useNavigate();

  const addToCart = async (item, quantity = 1) => {
    try {
      const user = await searchUser(
        null,
        JSON.parse(localStorage.getItem("user")).email
      );

      const product = {
        product_id: item.product_id,
        quantity: quantity,
      };

      cartAddItem(product, user.user_id);
      setNotif("addProduct");
    } catch (error) {
      console.error("Couldn't add to cart because user not found:", error);
    }
  };

  const buyNow = async (item, quantity = 1) => {
    try {
      const user = await searchUser(
        null,
        JSON.parse(localStorage.getItem("user")).email
      );

      const product = {
        product_id: item.product_id,
        quantity: quantity,
      };

      await cartAddItem(product, user.user_id);
      setNotif("addProduct");
    } catch (error) {
      console.error("Couldn't add to cart because user not found:", error);
    }

    navigate("/cart");
  };

  // Variable for reuse
  const shopItemsMiddleIndex = Math.floor((shopItemsRange - 1) / 2);
  // State that holds the middle index of current shopitems displayed
  const [currentIndex, setCurrentIndex] = useState(shopItemsMiddleIndex);

  // Initialize shopItemBoxOpen as an object
  const initialShopItemBoxStates = shopItems.reduce(
    (acc, _, index) => ({ ...acc, [index]: false }),
    {}
  );
  const [shopItemBoxOpen, setShopItemBoxOpen] = useState(
    initialShopItemBoxStates
  );

  const direction = useRef();

  // Memoize openShopItemBox and closeShopItemBox functions for efficiency
  const openShopItemBox = useCallback(
    (index) => {
      setShopItemBoxOpen((prev) => ({ ...prev, [index]: true }));
    },
    [setShopItemBoxOpen]
  );

  const closeShopItemBox = useCallback(
    (index) => {
      setShopItemBoxOpen((prev) => ({ ...prev, [index]: false }));
    },
    [setShopItemBoxOpen]
  );

  const shiftLeft = () => {
    if (currentIndex > 0 + shopItemsMiddleIndex) {
      setCurrentIndex(currentIndex - 1);
      direction.current = "left";
    }
  };

  const shiftRight = () => {
    if (
      currentIndex <
      shopItems.length - (1 + Math.ceil((shopItemsRange - 1) / 2))
    ) {
      setCurrentIndex(currentIndex + 1);
      direction.current = "right";
    }
  };

  // Calculate the animation direction for each item based on its index and the current index of the carousel
  const calculateAnimationDirection = (itemIndex) => {
    if (itemIndex === currentIndex) return 0; // No animation for the center item
    return itemIndex < currentIndex ? -25 : 25; // Move left or right
  };

  return (
    <div className="row quaternary-colour">
      {/* Backdrop and dropin box */}
      <AnimatePresence>
        {Object.entries(shopItemBoxOpen).map(([index, isOpen]) =>
          isOpen ? (
            <ShopItemBox
              key={index}
              item={shopItems[index]}
              isOpen={isOpen}
              handleClose={() => closeShopItemBox(index)}
              buyNow={buyNow}
              addToCart={addToCart}
            />
          ) : null
        )}
      </AnimatePresence>

      <div className="column-content">
        {/* If shopitems is null (when user deletes localStorage, display error message) */}
        {shopItems == null ? (
          <div className="fatal-error">
            <h1>localStorage was deleted, cannot show stock.</h1>
            <h1>Please refresh website.</h1>
          </div>
        ) : (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1.3 } }}
          >
            <h1>{title}</h1>
            <span className="profile-change-small-text">
              Click on the images for more information
            </span>
            <hr />
            <div>
              <div className="carousel-button">
                {/* Left button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="left-button"
                  onClick={shiftLeft}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </motion.button>
                {/* Right button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="right-button"
                  onClick={shiftRight}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </motion.button>
                {/* Display shopItems depending on shopItemsRange and the currentIndex */}
                {Array.from({ length: shopItemsRange }).map((_, i) => {
                  const index = currentIndex - shopItemsMiddleIndex + i;
                  const item = shopItems[index];
                  if (!item) return null; // Skip if item is undefined

                  // Calculate animation direction for the current item
                  const animateDirection = calculateAnimationDirection(index);

                  return (
                    <div className="textcard" key={index}>
                      <motion.div
                        className="card-content"
                        key={index} // Assigning the key prop to the motion.div
                        initial={{ x: animateDirection, opacity: 0 }}
                        animate={{
                          x: 0,
                          opacity: 1,
                          transition: { duration: 0.7 },
                        }}
                      >
                        <TextCard
                          index={index}
                          item={item}
                          openShopItemBox={openShopItemBox}
                          closeShopItemBox={closeShopItemBox}
                          buyNow={buyNow}
                          addToCart={addToCart}
                        />
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
