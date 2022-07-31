const CategoriesRepository = require('../repositories/categories.repositories');
const categoriesRepository = new CategoriesRepository();

class CategoriesServices {
  async getAllCategories() {
    return await categoriesRepository.getAllCategories();
  }

  async getCategoryById(id) {
    return await categoriesRepository.getCategoryById(id);
  }

  async createCategory(category) {
    return await categoriesRepository.createCategory(category);
  }

  async updateCategory(id, category) {
    return await categoriesRepository.updateCategory(id, category);
  }

  async deleteCategory(id) {
    return await categoriesRepository.deleteCategory(id);
  }
}

module.exports = CategoriesServices;
