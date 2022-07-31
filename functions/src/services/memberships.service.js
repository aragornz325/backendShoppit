const MembershipsRepository = require('../repositories/memberships.repository');
const membershipsRepository = new MembershipsRepository();

class MembershipsService {
  async getMemberships() {
    return await membershipsRepository.getMemberships();
  }
  async getMembership(id) {
    return await membershipsRepository.getMembershipById(id);
  }

  async createMembership(payload) {
    return await membershipsRepository.createMembership(payload);
  }

  async updateMembership(id, payload) {
    return await membershipsRepository.updateMembership(id, payload, true);
  }

  async deleteMembership(id) {
    return await membershipsRepository.deleteMembership(id);
  }
}

module.exports = MembershipsService;
