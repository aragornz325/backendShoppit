const ProductsRepository = require('../repositories/products.repository');
const productsRepository = new ProductsRepository();
const GoogleSheetsRepository = require('../repositories/googleSheet.repository');

const googleSheetsRepository = new GoogleSheetsRepository();

class ProductsServices {
  async createProduct(payload, id) {
    payload = {
      ...payload,
      published: true,
      variations: payload.variations.map((variation) => {
        return {
          ...variation,
          sku:
            variation.sku ||
            `${payload.name}/${variation.color}/${variation.size}/${id}`,
        };
      }),
    };
    return await productsRepository.createProduct(payload);
  }

  async getProductById(id) {
    return await productsRepository.getProductById(id);
  }

  async getProducts(search, limit, offset, owner_id) {
    if (owner_id == undefined) {
      if (search) {
        return await productsRepository.getProductByFilter(
          search,
          limit,
          offset
        );
      } else {
        return await productsRepository.getProducts(limit, offset);
      }
    } else {
      return await productsRepository.getProductByOwner(
        owner_id,
        limit,
        offset
      );
    }
  }

  async updateProduct(id, payload, merge) {
    return await productsRepository.updateProduct(id, payload, merge);
  }

  async deleteProduct(id) {
    return await productsRepository.deleteProduct(id);
  }

  async initSheet(id, payload) {
    return await googleSheetsRepository.initSheet(id, payload);
  }
  async getProductSheet(id, userId) {
    return await googleSheetsRepository.getProduct(id, userId);
  }
}

module.exports = ProductsServices;
