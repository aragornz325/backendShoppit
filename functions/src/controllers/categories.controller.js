const CategoriesServices = require('../services/categories.services');
const categoriesServices = new CategoriesServices();
const functions = require('firebase-functions');

class CategoriesController {
  async createCategory(req, res, next) {
    functions.logger.info('createCategory');
    try {
      const category = req.body;
      const result = await categoriesServices.createCategory(category);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllCategories(req, res, next) {
    functions.logger.info('getAllCategories');
    try {
      const result = await categoriesServices.getAllCategories();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    functions.logger.info('updateCategory');
    try {
      const id = req.params.id;
      const category = req.body;
      const result = await categoriesServices.updateCategory(id, category);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req, res, next) {
    functions.logger.info('getCategoryById');
    try {
      const id = req.params.id;
      const result = await categoriesServices.getCategoryById(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    functions.logger.info('deleteCategory');
    try {
      const id = req.params.id;
      const result = await categoriesServices.deleteCategory(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoriesController;
