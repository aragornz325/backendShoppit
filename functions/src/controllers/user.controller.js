const UserServices = require('../services/user.services');
const service = new UserServices();
const MembershipsRepository = require('../repositories/memberships.repository');
const membershipsRepository = new MembershipsRepository();

class UserController {
  async setCustomerClaimToNewUser(user) {
    try {
      await service.setCustomerClaimToUser(user);
      return;
    } catch (error) {
      throw new Error(error);
    }
  }

  async transformCustomerToSeller(req, res, next) {
    try {
      const body = req.body;
      const { id } = req.params;
      const result = await service.transformToSeller(body, id);

      res.status(202).send(result);
    } catch (error) {
      next(error);
    }
  }

  async verifySellerPayment(req, res, next) {
    try {
      const body = req.body;
      const { id } = req.params;
      const update = await service.verifySellerPayment(body, id);
      res.status(200).send(update);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await service.getUserById(id);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const body = req.body;
      await service.updateUser(id, body);
      res.status(200).send({ msg: 'update Ok' });
    } catch (error) {
      next(error);
    }
  }

  async deactivateUser(req, res, next) {
    try {
      const { id } = req.params;
      await service.deactivateUser(id);
      res.status(200).send({ msg: 'Ok' });
    } catch (error) {
      next(error);
    }
  }

  async activateUser(req, res, next) {
    try {
      const { id } = req.params;
      await service.activateUser(id);
      res.status(200).send({ msg: 'Ok' });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    const search = req.query.search;
    const role = req.query.role;
    const status = req.query.status;
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    try {
      const users = await service.getUsers(search, role, status, limit, offset);

      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserProductsByOwner(req, res, next) {
    try {
      const limit = req.query.limit || 10;
      const offset = req.query.offset || 0;
      const userId = req.headers['x-user-id'];
      const products = await service.getUserProductsByOwner(
        userId,
        limit,
        offset
      );
      res.status(200).send(products);
    } catch (error) {
      next(error);
    }
  }

  async registerUser(req, res, next) {
    try {
      const payload = req.body;
      const newUser = await service.registerUser(payload);
      res.status(201).send(newUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
