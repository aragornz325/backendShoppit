require('dotenv').config();
const { config } = require('../config/config');
const boom = require('@hapi/boom');
const axios = require('axios');

class Mercadopago {
  async consultSubscription(id) {
    if (!id) {
      throw boom.badRequest('missing required fields');
    }
    try {
      let consult = await axios.get(`${config.urlConsult}/${id}`, {
        headers: {
          Authorization: `Bearer ${config.tokenConsult}`,
        },
      });
      return consult;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Mercadopago;
