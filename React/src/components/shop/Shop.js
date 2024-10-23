import React, { useEffect, useReducer } from "react";
import { ThreeDots } from "react-loading-icons";

import { Carousel } from "../shop";
import { productsReducer } from "../Helpers";

import { getAllProducts } from "../../data/repository";

/** Shop component that displays products for the user to add to cart, then eventually purchase.
 *
 * @param {*} props
 * @returns JSX to display products for the user to interact with.
 */
const Shop = (props) => {
  // Products state
  const initialProducts = [];
  const [allProducts, dispatchAllProducts] = useReducer(
    productsReducer,
    initialProducts
  );
  const [discountedProducts, dispatchDiscountedProducts] = useReducer(
    productsReducer,
    initialProducts
  );
  const [stockedProducts, dispatchStockedProducts] = useReducer(
    productsReducer,
    initialProducts
  );
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    const setProducts = async () => {
      // Retrieve all shop items
      const products = JSON.parse(await getAllProducts());
      // change all products state
      dispatchAllProducts({ type: "SET_ALL_PRODUCTS", products: products });
      // change discounted products state
      dispatchDiscountedProducts({
        type: "SET_DISCOUNTED_PRODUCTS",
        products: products,
      });
      // change stocked products state
      dispatchStockedProducts({
        type: "SET_STOCKED_PRODUCTS",
        products: products,
      });
    };

    // call function to retrieve products
    setProducts();
  }, []);

  return (
    // Body of shop component
    <div>
      <div className="content">
        {stockedProducts.length > 0 ? (
          <Carousel
            title={"Stock that we recommend!"}
            shopItemsRange={3}
            shopItems={stockedProducts}
          />
        ) : (
          <>
            {/* carousel loading indicator */}
            <ThreeDots />
          </>
        )}
        {discountedProducts.length > 0 ? (
          <Carousel
            title={"Our best sellers!"}
            shopItemsRange={2}
            shopItems={discountedProducts}
          />
        ) : (
          <>
            {/* carousel loading indicator */}
            <ThreeDots />
          </>
        )}
        {allProducts.length > 0 ? (
          <Carousel
            title={"Our full selection!"}
            shopItemsRange={4}
            shopItems={allProducts}
          />
        ) : (
          <>
            {/* carousel loading indicator */}
            <ThreeDots />
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;
