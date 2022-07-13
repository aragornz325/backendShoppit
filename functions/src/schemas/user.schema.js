const joi = require('joi');

const firstName = joi.string();
const lastName = joi.string();
const addresses = joi.array();
const billing = joi.object();
const cookie = joi.string();
const id = joi.string().alphanum();
const identification = joi.object({
  number: joi.number(),
  type: joi.string(),
});
const isConsultor = joi.boolean();
const isSocial = joi.boolean();
const isVender = joi.boolean();
const loggedIn = joi.boolean();
const minimum_purchase = joi.number();
const nicename = joi.string();
const picture = joi.string().uri();
const product_id_selected_from_web = joi.string();
const purchases = joi.array();
const recentProducts = joi.array();
const sheetsId = joi.string();
const storeName = joi.string();
const storePicture = joi.string().uri();
const url = joi.string();
const username = joi.string();
const wishList = joi.array();
const password = joi.string().alphanum().min(4).max(12);
const email = joi.string().email();
const role = joi.string().valid('admin', 'vender', 'customer');
const status = joi.string().valid('active', 'inactive', 'pending');
const search = joi.string();
const limit = joi.string().min(1).max(2);
const offset = joi.string().min(1).max(2);

const querySchema = joi.object({
  role,
  status,
  search,
  limit,
  offset,
});

const createUser = joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  addresses: addresses.required(),
  billing: billing.required(),
  cookie: cookie.required(),
  identification: identification.required(),
  isConsultor: isConsultor.required(),
  isSocial: isSocial.required(),
  isVender: isVender.required(),
  loggedIn: loggedIn.required(),
  minimum_purchase: minimum_purchase.required(),
  nicename: nicename.required(),
  picture: picture.required(),
  product_id_selected_from_web: product_id_selected_from_web.required(),
  purchases: purchases.required(),
  recentProducts: recentProducts.required(),
  sheetsId: sheetsId.required(),
  storeName: storeName.required(),
  storePicture: storePicture.required(),
  url: url.required(),
  username: username.required(),
  wishList: wishList.required(),
});

const updateUser = joi.object({
  email: email,
  addresses: addresses,
  billing: billing,
  cookie: cookie,
  firstName: firstName,
  lastName: lastName,
  id: id,
  identification: identification,
  isConsultor: isConsultor,
  isSocial: isSocial,
  isVender: isVender,
  loggedIn: loggedIn,
  minimum_purchase: minimum_purchase,
  nicename: nicename,
  picture: picture,
  product_id_selected_from_web: product_id_selected_from_web,
  purchases: purchases,
  recentProducts: recentProducts,
  sheetsId: sheetsId,
  storeName: storeName,
  storePicture: storePicture,
  url: url,
  username: username,
  wishList: wishList,
  role: role,
});

const createUssAndPass = joi.object({
  email: email.required(),
  password: password.required(),
});

const verifyIdToken = joi.object({
  idToken: joi.string().required(),
});
module.exports = {
  createUser,
  updateUser,
  createUssAndPass,
  verifyIdToken,
  querySchema,
};
