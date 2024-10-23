import React, { useEffect, useReducer } from "react";
import { motion } from "framer-motion";
import { ThreeDots } from "react-loading-icons";

import { Carousel } from "../shop";
import { GrowInformation, productsReducer } from "../Helpers";

import { getAllProducts } from "../../data/repository";

/**
 *
 * @param {*} props
 * @returns display for home page
 */
const Home = (props) => {
  // Products state
  const initialSpecialsProducts = [];
  const [specialsProducts, dispatchSpecialsProducts] = useReducer(
    productsReducer,
    initialSpecialsProducts
  );

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    const setProducts = async () => {
      // Retrieve all shop items
      const products = JSON.parse(await getAllProducts());
      // Determine specials, for now is whatever is on stock and discounted
      dispatchSpecialsProducts({
        type: "SET_SPECIALS_PRODUCTS",
        products: products,
      });
    };

    // call function to retrieve products
    setProducts();
  }, []);

  return (
    <div>
      {/* Landing page splash video */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
      >
        <div className="background-video font-logo">
          Redefining Convenience with Nature's Bounty
        </div>
      </motion.div>

      {/* Green border after video */}
      <div className="video-border"></div>

      {/* Content of page, carousel and growable vegetables */}
      <div className="content">
        {specialsProducts.length > 0 ? (
          <Carousel
            title={"Look at our weekly specials!"}
            shopItemsRange={3}
            shopItems={specialsProducts}
          />
        ) : (
          <>
            {/* carousel loading indicator */}
            <ThreeDots />
          </>
        )}
        <GrowInformation />
      </div>
    </div>
  );
};

export default Home;
