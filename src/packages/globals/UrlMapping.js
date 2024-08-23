const API = "http://localhost:8088/api";
const AUTH = API + "/auth";
const order = API + "/order";
const UrlMapping = {
  ITEMS: API + "/items",
  MANAGER: API + "/manager",
  PRODUCT: API + "/product",
  CUSTOMER: API + "/customer",
  USER: API + "/user",
  CART: API + "/shoppingcart",
  REVIEW: API + "/review",
  ORDER: API + "/order",
  CHECKOUT: order + "/checkout",
  SIGN_IN: AUTH + "/sign-in",
  SIGN_UP: AUTH + "/sign-up",
  EXAMPLE_PATH: "/example",
  FILTERED_PART: "/filtered",
  CHANGE_NAME_PART: "/change-name",
  CHANGE_DESCRIPTION_PART: "/change-description",
  CHANGE_QUANTITY_PART: "/change-quantity",
  CHANGE_PASSWORD_PART: "/change-password",
  CHANGE_USERNAME_PART: "/change-username",
  CHANGE_SALARY_PART: "/change-salary",
  CHANGE_POINTS_PART: "/change-points",
  BY_USER: "/by-user",
};

export default UrlMapping;
