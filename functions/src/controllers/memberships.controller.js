const MembershipsService = require('../services/memberships.service');
const membershipsService = new MembershipsService();
const boom = require('@hapi/boom');

class MembershipsController {
  async createMembership(req, res, next) {
    try {
      const payload = req.body;
      await membershipsService.createMembership(payload);
      res.status(201).send({ msg: 'membership created' });
    } catch (error) {
      next(error);
    }
  }
  async updateMembership(req, res, next) {
    try {
      const id = req.params.id;
      const payload = req.body;
      if (!id || !payload) {
        throw boom.badData('missing required fields');
      }
      await membershipsService.updateMembership(id, payload);
      res.status(200).send({ msg: 'membership updated' });
    } catch (error) {
      next(error);
    }
  }
  async deleteMembership(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw boom.badData('missing required fields');
      }
      await membershipsService.deleteMembership(id);
      res.status(200).send({ msg: 'membership deleted' });
    } catch (error) {
      next(error);
    }
  }
  async getMemberships(req, res, next) {
    try {
      const memberships = await membershipsService.getMemberships();
      res.status(200).send(memberships);
    } catch (error) {
      next(error);
    }
  }
  async getMembership(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw boom.badData('missing required fields');
      }
      const membership = await membershipsService.getMembership(id);
      res.status(200).send(membership);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MembershipsController;
