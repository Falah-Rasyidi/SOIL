import { render, screen, fireEvent } from "@testing-library/react";
import { getAllProducts, cartAddItem } from "../data/repository";

import { ShopItemBox } from "../components/shop";

let TextCardContainer;
let products;

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

    cartAddItem(product, user.user_id);
    setNotif("addProduct");
  } catch (error) {
    console.error("Couldn't add to cart because user not found:", error);
  }

  navigate("/cart");
};

// beforeAll(async () => {
//   products = await getAllProducts();
// });

beforeEach(async () => {
  localStorage.setItem("user", {
    user_id: 1,
    username: "natch",
    email: "natch@gmail.com",
    date_joined: "2024-05-09T00:00:00.000Z",
    headline: null,
    bio: null,
    interests: null,
    cartId: null,
  });

  products = await getAllProducts();
  products = JSON.parse(products);
  const ShopItemBoxUtils = render(
    <ShopItemBox
      key={0}
      item={products[0]}
      isOpen={true}
      handleClose={() => closeShopItemBox(index)}
      buyNow={buyNow}
      addToCart={addToCart}
    />
  );
  TextCardContainer = ShopItemBoxUtils.container;
});

// The cart should be able to hold numbers up to the 32-bit integer limit
test("Adding exceedingly large quantities (9 digits long)", () => {
  const input = screen.getByDisplayValue("1");
  const button = screen.getByRole("button", {
    name: "Add to Cart",
  });

  // Ensure that the 32-bit integer limit can be inputted
  fireEvent.change(input, { target: { value: 2147483647 } });

  expect(input.value).toBe("2147483647");

  fireEvent.click(button);
});

test("Adding items then deleting account", () => {});

test("Checking cart total accuracy", () => {});
