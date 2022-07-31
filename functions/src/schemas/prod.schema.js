const joi = require('joi');

const isAstroselling = joi.boolean();
const channel_id = joi.number().integer();
const available_colors = joi.string();
const available_size = joi.string();
const category = joi.string();
const color = joi.string().max(20);
const currency = joi.string().valid('ARS', 'USD', 'BRL', 'PYG').default('ARS');
const stock = joi.number().integer();
const description = joi.string().max(255);
const features = joi.string().max(255);
const featured = joi.boolean();
const featuredImage = joi.string().uri();
const freeShipping = joi.boolean();
const height = joi.number().positive();
const id = joi.string().alphanum(); //TODO: requiere confirmacion del largo del ID
const image_url = joi.array().items(joi.string().uri());
const images = joi.array().items(joi.string().uri());
const images_url = joi.array();
const in_stock = joi.boolean();
const is_published = joi.boolean();
const longitude = joi.number().positive();
const manage_colors = joi.boolean();
const manage_size = joi.boolean();
const manage_stock = joi.boolean();
const min_sell_amount = joi.number().integer();
const name = joi.string().max(40);
const origin = joi.string().max(20);
const offer_price = joi.number().positive();
const owner_id = joi.string().alphanum();
const permalink = joi.string().uri();
const plataform = joi.string().max(5);
const price = joi.any();
const productAttributes = joi.string();
const publish = joi.boolean();
const quantity = joi.number().integer();
const quantity_to_cart = joi.string();
const regular_price = joi.number().integer();
const sale_price = joi.number().integer().positive();
const selected_variation = joi.string();
const size = joi.string();
const sku = joi.string();
const state = joi.string().valid('new', 'used');
const status = joi.string();
const stock_quantity = joi.number().positive();
const stock_XS = joi.number().integer().positive();
const stock_S = joi.number().integer().positive();
const stock_M = joi.number().integer().positive();
const stock_L = joi.number().integer().positive();
const stock_XL = joi.number().integer().positive();
const short_description = joi.string().max(250);
const tags = joi.array();
const total_sales = joi.number();
const total_stock = joi.number().positive();
const type = joi.string();
const updated = joi.array();
const variable_products = joi.array();
const variation_type = joi.string().min(3).max(100);

const variations = joi.array().items({
  variation_type,
  size,
  color,
  quantity,
  sku,
});
const vendor = joi.object({
  minimum_purchase: joi.number(),
  name: joi.string(),
  picture: joi.string(),
  storeName: joi.string(),
  vendor_id: joi.string().alphanum(),
});
const volumen = joi.number();
const weight = joi.number().positive();
const width = joi.number().positive();
const withError = joi.boolean();
const dimensions = joi.object({
  height,
  width,
  longitude,
  weight,
});

const createProduct = joi.object({
  name: name.required(),
  description: description.required(),
  regular_price: regular_price.required(),
  state,
  variations,
  images_url,
  category: category.required(),
  offer_price,
  min_sell_amount: min_sell_amount.required(),
  dimensions,
  currency,
  owner_id: owner_id.required(),
  features: features.required(),
});

const validateSheetsProduct = joi.object({
  name: name.required(),
  offer_price: offer_price.required(),
  regular_price: regular_price.required(),
  description: description.required(),
  image_url: image_url.required(),
  height: height.required(),
  width: width.required(),
  weight: weight.required(),
  longitude: longitude.required(),
  sku: sku.required(),
  stock_XS: stock_XS.required(),
  stock_S: stock_S.required(),
  stock_M: stock_M.required(),
  stock_L: stock_L.required(),
  stock_XL: stock_XL.required(),
});

const validateItem = joi
  .array()
  .items(
    name,
    offer_price,
    regular_price,
    description,
    image_url,
    height,
    width,
    weight,
    longitude,
    sku,
    stock_XS,
    stock_S,
    stock_M,
    stock_L,
    stock_XL
  );
const updateProduct = joi.object({
  name,
  description,
  regular_price,
  state,
  variations,
  images_url,
  total_stock,
  sku,
  category,
  publish,
  offer_price,
  min_sell_amount,
  dimensions,
});

const getOne = joi.object({
  id: id.required(),
});

module.exports = {
  createProduct,
  updateProduct,
  getOne,
  validateItem,
};
