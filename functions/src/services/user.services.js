const { getAuth } = require('firebase-admin/auth');
const boom = require('@hapi/boom');
const functions = require('firebase-functions');
const { sendEmail } = require('../utils/mailer');
const { activeSeller, freeTrial } = require('../utils/baseMails.js');
const Mercadopago = require('./mercadopago.services');
const UserRepository = require('../repositories/user.repository');
const userRepository = new UserRepository();
const mercadopago = new Mercadopago();
const MembershipsRepository = require('../repositories/memberships.repository');
const { date } = require('joi');
const membershipsRepository = new MembershipsRepository();
const ProductsRepository = require('../repositories/products.repository');
const productsRepository = new ProductsRepository();

class UserServices {
  async transformToSeller(body, id) {
    const check_trial = await membershipsRepository.getMembershipById(
      body.membership_id
    );
    if (check_trial.name !== 'trial') {
      await this.transformCustomerToSeller(body, id);
      return { msg: 'ok' };
    } else {
      await this.transforCustomerToTrialSeller(body, id);
      return { msg: 'ok' };
    }
  }

  async setCustomerClaimToUser(user) {
    const auth = getAuth();
    functions.logger.info('seting customer claim to user');
    await auth.setCustomUserClaims(user.uid, { role: ['customer'] });
    functions.logger.info(`seting claim to user ${JSON.stringify(user)}`);
    await userRepository.createUser(user);
    return { msg: 'ok' };
  }

  async transformCustomerToSeller(body, id) {
    await userRepository.updateUser(
      id,
      {
        status: 'pending',
        activeVender: false,
        billing: {
          ...body,
        },
      },
      true
    );

    return {
      message: 'ok',
    };
  }

  async transforCustomerToTrialSeller(body, id) {
    const user = await userRepository.getUserById(id);
    if (!user.id) {
      functions.logger.warn('missing data to verify seller payment');
      throw boom.notAcceptable('missing data to verify seller payment');
    }
    functions.logger.info('transforming customer to seller - trial plan');
    const auth = getAuth();
    functions.logger.info('seting customer claim to user');
    await auth.setCustomUserClaims(id, { role: ['seller'] });
    functions.logger.info('updateing user');
    await userRepository.updateUser(
      id,
      {
        pagoId: 'no payment, is trial',
        status: 'active',
        role: 'seller',
        isVender: true,
        activeVender: true,
        user_membership: {
          membarship_id: body.membership_id,
          due_date: '', //TODO: revisar fecha de caducidad de la membresia
          membership_payments: [
            {
              platform_name: 'free Trial', //TODO: revisar nombre de la plataforma
              payment_platform_id: 'trial',
              payment_date: Math.floor(Date.now() / 1000),
              payment_status: 'trial',
            },
          ],
        },
      },
      true
    );
    await membershipsRepository.createMembershipHistory({
      user_id: id,
      membership_id: body.membership_id,
      membership_date: Date.now(),
    });
    const mail = {
      from: 'shoppit info',
      to: user.email,
      subject: 'tu cuenta ha sido activada',
      html: freeTrial(),
    };
    sendEmail(mail);
    return {
      msg: 'ok',
    };
  }

  async verifySellerPayment(body, id) {
    const auth = getAuth();
    const user = await userRepository.getUserById(id);

    if (!user.id || !body.pagoId) {
      functions.logger.warn('missing data to verify seller payment');
      throw boom.notAcceptable('missing data to verify seller payment');
    }
    const response = await mercadopago.consultSubscription(body.pagoId);
    functions.logger.info(response.data);

    if (response.data.status !== 'authorized') {
      await userRepository.updateUser(
        id,
        {
          isVender: false,
        },
        true
      );
      functions.logger.warn('the payment is not authorizedt');
      throw boom.badData('the payment is not authorized');
    }

    await auth.setCustomUserClaims(id, { role: ['seller'] });

    await userRepository.updateUser(
      id,
      {
        pagaId: body.pagoId,
        status: 'active',
        role: 'seller',
        isVender: true,
        activeVender: true,
        user_membership: {
          membarship_id: body.membershipId,
          due_date: '', //TODO: revisar fecha de caducidad de la membresia
          membership_payments: [
            {
              platform_name: 'mercadopago', //TODO: revisar nombre de la plataforma
              payment_platform_id: body.pagoId,
              payment_date: Math.floor(Date.now() / 1000), //TODO: revisar pasar a UNIX
              payment_status: response.data.status,
            },
          ],
        },
      },
      true
    );

    const mail = {
      from: 'shoppit info',
      to: user.email,
      subject: 'tu cuenta ha sido activada',
      html: activeSeller(),
    };
    sendEmail(mail);
    return {
      msg: 'ok',
    };
  }

  async getUserById(id) {
    const user = await userRepository.getUserById(id);
    return user;
  }

  async updateUser(id, body) {
    const user = await userRepository.updateUser(id, body, true);
    return user;
  }

  async getUserByEmail(email) {
    const user = await userRepository.getUserByEmail(email);
    return user;
  }

  async deactivateUser(id) {
    await getAuth().updateUser(id, {
      disabled: true,
    });

    await userRepository.updateUser(
      id,
      {
        status: 'deactivated',
      },
      true
    );
    functions.logger.info(`user with id:${id} has been deactivated`);
  }

  async activateUser(id) {
    await getAuth().updateUser(id, {
      disabled: false,
    });

    await userRepository.updateUser(
      id,
      {
        status: 'activated',
      },
      true
    );
    functions.logger.info(`user with id:${id} has been activated`);
  }

  async getUsers(search, role, status, limit, offset) {
    const user = await userRepository.getUsers(
      search,
      role,
      status,
      limit,
      offset
    );
    return user;
  }

  async getUserProductsByOwner(id, limit, offset) {
    const user = await productsRepository.getProductByOwner(id, limit, offset);
    return user;
  }

  async registerUser(payload) {
    console.log(payload);
    let result = '';
    await getAuth()
      .createUser({
        email: payload.email,
        emailVerified: false,
        phoneNumber: payload.phoneNumber,
        password: payload.password,
        displayName: payload.displayName,
        photoURL: payload.photoURL,
        disabled: false,
      })
      .then((userrecord) => {
        functions.logger.info(
          (result = userrecord),
          `user with email:${userrecord.email} has been created, id:${userrecord.uid}`
        );
      })
      .catch((error) => {
        throw boom.badData(error);
      });
    return result;
  }
}

module.exports = UserServices;
