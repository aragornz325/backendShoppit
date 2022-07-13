const { db } = require('../../config/firebase');
const functions = require('firebase-functions');
const boom = require('@hapi/boom');
const { config } = require('../config/config');
const algoliasearch = require('algoliasearch');

class MembershipsRepository {
  async createMembership(payload) {
    functions.logger.info('Creating membership');
    let checkMembership = '';
    await db
      .collection('memberships')
      .where('name', '==', payload.name)
      .where('payment_cycle', '==', payload.payment_cycle)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          checkMembership = doc.data();
        });
      })
      .catch((err) => {
        throw boom.badData(err);
      });

    functions.logger.info('Checking if membership already exists');
    if (checkMembership.name && checkMembership.name === payload.name) {
      functions.logger.info('Membership already exists');
      throw boom.badData('membership already exists');
    } else {
      const membershipsRef = db.collection('memberships');
      const memberships = await membershipsRef.add({
        ...payload,
        createdAt: new Date(),
      });
      functions.logger.info('Membership created');
      return memberships.id;
    }
  }

  async updateMembership(id, payload, merge) {
    const membershipsRef = db.collection('memberships').doc(id);
    const memberships = await membershipsRef.get();
    if (!memberships.exists) {
      functions.logger.error(`membership with ID ${id} not found`);
      throw boom.badData(`membership with ID ${id} not found`);
    }
    await membershipsRef.set(payload, { merge: merge });
    functions.logger.info(`update ok`);
    return;
  }

  async deleteMembership(id) {
    const membershipsRef = db.collection('memberships').doc(id);
    const memberships = await membershipsRef.get();
    if (!memberships.exists) {
      functions.logger.error(`membership with ID ${id} not found`);
      throw boom.badData(`membership with ID ${id} not found`);
    }
    await membershipsRef.delete();
    functions.logger.info(`delete ok`);
    return { msg: 'ok' };
  }

  async getMemberships() {
    const membershipsRef = db.collection('memberships');
    const memberships = await membershipsRef.get();
    const membershipsList = [];
    memberships.forEach((doc) => {
      membershipsList.push(doc.data());
    });
    functions.logger.info(`getMemberships ok`);
    return membershipsList;
  }
}

module.exports = MembershipsRepository;
