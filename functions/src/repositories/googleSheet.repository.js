const { GoogleSpreadsheet } = require('google-spreadsheet');
const { config } = require('../config/config');
const functions = require('firebase-functions');
const { createProduct } = require('../schemas/prod.schema');
const ProductsRepository = require('../repositories/products.repository');
const productsRepository = new ProductsRepository();

const boom = require('@hapi/boom');
const headers = [
  'name',
  'description',
  'currency',
  'regular_price',
  'state',
  'images_url',
  'category',
  'offer_price',
  'min_sell_amount',
  'sku',
  'variation_type',
  'size',
  'color',
  'quantity',
  'height',
  'width',
  'longitude',
  'weight',
];

let userSheet = null;

class GoogleSheetsRepository {
  async createProductObject(spreadId, item, rowRef, userId) {
    const product = {
      name: item.name,
      currency: item.currency,
      regular_price: parseInt(item.regular_price, 10),
      description: item.description,
      state: item.state,
      images_url: [item.images_url] || [''],
      category: item.category,
      variations: [
        {
          variation_type: item.variation_type,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          sku:
            item.sku || `row_${rowRef}/${item.name}/${item.color}/${spreadId}`,
        },
      ],
      dimensions: {
        height: parseFloat(item.height),
        width: parseFloat(item.width),
        longitude: parseFloat(item.longitude),
        weight: parseFloat(item.weight),
      },
      offer_price: parseFloat(item.offer_price, 10),
      min_sell_amount: parseInt(item.min_sell_amount, 10),
      publish: true,
      owner_id: userId,
      total_stock: parseInt(item.quantity, 10),
    };

    return product;
  }

  async docConstructor(spreadId) {
    const doc = new GoogleSpreadsheet(spreadId);
    await doc.useServiceAccountAuth({
      client_email: config.client_email,
      private_key: config.private_key,
    });
    return doc;
  }

  async initSheet(id) {
    const doc = await this.docConstructor(id);
    userSheet = await doc.addSheet({
      title: 'Shoppit',
      headerValues: headers,
    });
    await userSheet.insertDimension('COLUMNS', {
      startIndex: 26,
      endIndex: 1000,
    });
    await userSheet.loadCells('A1:ALL1');
    const celdaId = userSheet.getCellByA1('ALL1');
    celdaId.value = 'id';
    await userSheet.saveUpdatedCells();

    functions.logger.log('initSheet: OK');

    return 'ok';
  }

  async getProduct(spreadId, userId) {
    const doc = await this.docConstructor(spreadId);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];
    const rows = await sheet.getRows();

    if (rows.length <= 0) {
      throw boom.badData('The sheet is empty');
    }
    functions.logger.info(`starting process of destructuring sheet`);
    for (let i = 0; i < rows.length; i++) {
      const item = rows[i];
      if (item.id) {
        functions.logger.info(`the row is already indexed in the db`);
        continue;
      }
      const rowRef = parseInt(item._rowNumber, 10);
      let payload = await this.createProductObject(
        spreadId,
        item,
        rowRef,
        userId
      );

      const { error } = createProduct.validate(payload);
      if (error) {
        functions.logger.log(`error in item ${rows[i].name}, ${error}`);
        throw boom.badData(`error in item ${rows[i].name}, ${error}`);
      }
      functions.logger.log(`inserting product of row ${rowRef} in collection`);
      const productID = await productsRepository.createProduct(payload);
      functions.logger.log(` setting id in sheet`);
      item.id = productID;
      await item.save();
    }
    return { msg: 'ok' };
  }

  async updateProduct(spreadId) {
    const doc = await this.docConstructor(spreadId);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];
    const rows = await sheet.getRows();

    for (let i = 0; i < rows.length; i++) {
      const item = rows[i];
      let payload = await this.createProductObject(item);
      const rowRef = parseInt(item._rowNumber, 10);
      const productInDb = await productsRepository.getProductById(item.id);
      if (
        productInDb.name === payload.name &&
        productInDb.offer_price === payload.offer_price &&
        productInDb.regular_price === payload.regular_price &&
        productInDb.description === payload.description &&
        productInDb.image_url === payload.image_url &&
        productInDb.stock_XS === payload.stock_XS &&
        productInDb.stock_S === payload.stock_S &&
        productInDb.stock_M === payload.stock_M &&
        productInDb.stock_L === payload.stock_L &&
        productInDb.stock_XL === payload.stock_XL &&
        productInDb.sku === payload.sku &&
        productInDb.height === payload.height &&
        productInDb.width === payload.width &&
        productInDb.longitude === payload.longitude &&
        productInDb.weight === payload.weight
      ) {
        functions.logger.log(`the row ${rowRef} not need to be updated`);
        continue;
      }

      const { error } = createProduct.validate(payload);
      if (error) {
        functions.logger.log(`error in item ${rows[i].name}, ${error}`);
        throw boom.badData(`error in item ${rows[i].name}, ${error}`);
      }
      functions.logger.log(`updating product of row ${rowRef} in collection`);
      await productsRepository.updateProduct(item.id, payload);
    }
  }
}

module.exports = GoogleSheetsRepository;
