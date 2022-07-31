const { db } = require('../../config/firebase');
const functions = require('firebase-functions');
const boom = require('@hapi/boom');
const { config } = require('../config/config');

class CategoriesRepository {
  async createCategory(category) {
    functions.logger.info(
      `check if the category with name: ${category.name} already exists`
    );
    const categoryInDb = await this.getCategoryByName(category.name);
    if (categoryInDb.name === category.name) {
      functions.logger.info(
        `the category with name ${category.name} already exists`
      );
      return { msg: 'ok' };
    } else {
      functions.logger.info(`create category`);
      await db.collection('categories').add(category);
      return { msg: 'ok' };
    }
  }

  async getCategoryByName(name) {
    functions.logger.info(`get category by name: ${name}`);
    const category = await db
      .collection('categories')
      .where('name', '==', name)
      .get();
    if (category.empty) {
      functions.logger.info(`category with name ${name} does not exist`);
      return { msg: 'ok' };
    } else {
      functions.logger.info(`category with name ${name} already exists`);
      return { msg: 'ok' };
    }
  }

  async getAllCategories() {
    functions.logger.info('get all categories');
    const categories = [];
    await db
      .collection('categories')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          categories.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      })
      .catch((error) => {
        throw boom.badData(error);
      });
    return categories;
  }

  async getCategoryById(id) {
    functions.logger.info('get category by id');
    const category = await db.collection('categories').doc(id).get();
    if (category.empty) {
      functions.logger.info(`category with id ${id} does not exist`);
      return { msg: 'ok' };
    } else {
      functions.logger.info(`category with id ${id} already exists`);
      return category.data();
    }
  }

  async updateCategory(id, category) {
    functions.logger.info('update category');
    await db.collection('categories').doc(id).update(category);
    return { msg: 'ok' };
  }

  async deleteCategory(id) {
    functions.logger.info('delete category');
    await db.collection('categories').doc(id).delete();
    return { msg: 'ok' };
  }
}

module.exports = CategoriesRepository;
