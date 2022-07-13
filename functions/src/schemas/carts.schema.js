/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const joi = require('joi');
const { createProduct, updateProduct } = require('./prod.schema')

const buyer_id = joi.string().alphanum();
const cart_paid = joi.boolean();
const name = joi.string();
const minimum_purchase = joi.number();
const picture = joi.string().uri();
const storeName = joi.string();
const vendor_id = joi.string().alphanum();
const vendor_image = joi.string().uri();

const createCartsSc = joi.object({
  buyer_id: buyer_id.required(),
  cart_paid: cart_paid.required(),
  name: name.required(),
  products: createProduct.required(),
  vendor: joi.object({
    minimum_purchase: minimum_purchase.required(),
    name: name.required(),
    picture: picture.required(),
    storeName: storeName.required(),
    vendor_id: vendor_image.required(),
  }).required(),
  vendor_image: vendor_image.required(),
});

const updateCartsSc = joi.object({
  buyer_id,
  cart_paid,
  name,
  products: updateProduct,
  vendor: joi.object({
    minimum_purchase,
    name,
    picture,
    storeName,
    vendor_id,
  }),
  vendor_image,
});

const getOneCartSc = joi.object({
  id: joi.string().alphanum().min(20).max(20),
});

module.exports = {
  createCartsSc,
  updateCartsSc,
  getOneCartSc,
};
