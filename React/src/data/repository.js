import axios from "axios";

// CAPTIALS
// AT LEAST TWO WORDS SEPARATED BY AN UNDERSCORE
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";
const PRODUCTS_KEY = "shop";

// User functions
export async function verifyUser(email, password) {
  const response = await axios.get(API_HOST + "/api/user/login", {
    params: { email, password },
  });
  const user = response.data;

  return user;
}

export async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/user", user);

  return response.data;
}

export const searchUser = async (username = null, email = null) => {
  const response = await axios.get(API_HOST + "/api/user/select", {
    params: { username, email },
  });

  return response.data;
};

export async function editUser(currUser, newUser) {
  const response = await axios.put(API_HOST + "/api/user/edit", {
    currUser,
    newUser,
  });

  return response.data;
}

export async function deleteUser(user_id) {
  const response = await axios.delete(`${API_HOST}/api/user/${user_id}`);

  return response.data;
}

// Shop functions
export async function getAllProducts() {
  if (localStorage.getItem(PRODUCTS_KEY) === null) {
    const response = await axios.get(API_HOST + "/api/product/");
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(response.data));

    return localStorage.getItem(PRODUCTS_KEY);
  }

  return localStorage.getItem(PRODUCTS_KEY);
}

// Cart functions
export async function cartAddItem(product, user_id = null) {
  const response = await axios.post(API_HOST + "/api/cart/", {
    product,
    user_id,
  });

  return response.data;
}

export async function deleteItem(user_id, product_id) {
  const response = await axios.delete(API_HOST + "/api/cart/delete", {
    params: {
      user_id,
      product_id,
    },
  });

  return response.data;
}

export async function removeAllUserProducts(user_id) {
  const response = await axios.put(API_HOST + "/api/cart/:id", { user_id });

  return response.data;
}

export async function getUserProducts(user_id) {
  console.log("USER ID (IN FUNCTION CALL) IS: " + user_id);
  const response = await axios.get(API_HOST + "/api/cart/:id", {
    params: { user_id: user_id },
  });
  console.log("RESPONSE DATA IS: " + JSON.stringify(response.data));
  return response.data;
}

// localStorage functions -----------------------------------------------------
// Set current user into localStorage
export function setCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Retrieves current user from localStorage
export function getCurrentUser() {
  return localStorage.getItem(USER_KEY) === null
    ? null
    : localStorage.getItem(USER_KEY);
}

// get pricetag information
export function getShopItemPriceString(shopItem) {
  const currency = "$";
  let price = shopItem.price;
  const fullPrice = {
    currency: currency,
    dollars: Math.floor(price),
    cents: String(((price % 1) * 100).toFixed(0)).padStart(2, "0"),
  };
  const discount = shopItem.discount;
  const discountString = "-" + shopItem.discount.toString() + "%";
  // Apply discount to get discounted price
  price = shopItem.price - (shopItem.price * discount) / 100;
  // Round the discounted price to two decimal places
  price = Math.round(price * 100) / 100;
  // Calculate dollars and cents for discounted price
  const discountedPrice = {
    currency: currency,
    dollars: Math.floor(price),
    cents: String(((price % 1) * 100).toFixed(0)).padStart(2, "0"),
  };
  return { fullPrice, discountedPrice, discountString };
}
