const express = require('express');
const router = express.Router();
const PrductsController = require('../controllers/products.controller');
const productsController = new PrductsController();
const CategoriesController = require('../controllers/categories.controller');
const categoriesController = new CategoriesController();
const {
  createProduct,
  updateProduct,
  getOne,
} = require('../schemas/prod.schema');
const {
  createCategory,
  updateCategory,
} = require('../schemas/category.schema');
const {
  isAuthenticated,
  isAuthorized,
  checkApiKey,
} = require('../middlewares/auth.handler');

const validatorHandler = require('../middlewares/validatorHandler');

router.get('', checkApiKey, checkApiKey, productsController.getProducts);
router.post(
  '/categories',
  checkApiKey,
  validatorHandler(createCategory, 'body'),
  categoriesController.createCategory
);
router.get('/categories', checkApiKey, categoriesController.getAllCategories);
router.patch(
  '/categories/:id',
  checkApiKey,
  validatorHandler(updateCategory, 'body'),
  categoriesController.updateCategory
);
router.get(
  '/categories/:id',
  checkApiKey,
  categoriesController.getCategoryById
);
router.delete(
  '/categories/:id',
  checkApiKey,
  categoriesController.deleteCategory
);

router.post(
  '/batch/:id',
  checkApiKey,
  isAuthenticated,
  isAuthorized({
    hasRole: ['admin', 'seller'],
    allowSameUser: false,
  }),
  productsController.initSheet
);
router.get(
  '/batch/:id',
  checkApiKey,
  isAuthenticated,
  isAuthorized({
    hasRole: ['admin', 'seller'],
    allowSameUser: false,
  }),
  productsController.getProductSheet
);

router.post(
  '/:id',
  checkApiKey,
  isAuthenticated,
  isAuthorized({
    hasRole: ['admin', 'seller'],
    allowSameUser: true,
  }),
  validatorHandler(createProduct, 'body'),
  productsController.createProduct
);
router.get('/:id', checkApiKey, productsController.getProductById);
router.put(
  '/:id',
  checkApiKey,
  isAuthenticated,
  isAuthorized({
    hasRole: ['admin', 'seller'],
    allowSameUser: true,
  }),
  productsController.updateProduct
);
router.delete(
  '/:id',
  checkApiKey,
  isAuthenticated,
  isAuthorized({
    hasRole: ['admin'],
    allowSameUser: false,
  }),
  productsController.deleteProduct
);

module.exports = router;
