const express = require('express');
const router = express.Router();
const MembershipsController = require('../controllers/memberships.controller');
const membershipscontroller = new MembershipsController();
const {
  createMembershipDTO,
  updateMembershipDTO,
} = require('../schemas/memberships.schema');

const {
  isAuthenticated,
  isAuthorized,
  checkApiKey,
} = require('../middlewares/auth.handler');

const validatorHandler = require('../middlewares/validatorHandler');

router.get('/', checkApiKey, membershipscontroller.getMemberships);
router.post(
  '/',
  checkApiKey,
  isAuthenticated,
  isAuthorized({
    hasRole: ['admin'],
    allowSameUser: false,
  }),
  validatorHandler(createMembershipDTO, 'body'),
  membershipscontroller.createMembership
);
router.get(
  '/:id',
  checkApiKey,
  isAuthenticated,
  isAuthorized({
    hasRole: ['customer', 'admin', 'seller'],
    allowSameUser: false,
  }),
  membershipscontroller.getMembership
);
router.patch(
  '/:id',
  checkApiKey,
  isAuthenticated,
  isAuthorized({
    hasRole: ['admin'],
    allowSameUser: false,
  }),
  validatorHandler(updateMembershipDTO, 'body'),
  membershipscontroller.updateMembership
);
router.delete(
  '/:id',
  checkApiKey,
  isAuthenticated,
  isAuthorized({
    hasRole: ['admin'],
    allowSameUser: false,
  }),
  membershipscontroller.deleteMembership
);

module.exports = router;
