const MembershipsRepository = require('../repositories/memberships.repository');
const membershipsRepository = new MembershipsRepository();

class MembershipsService {
  // getMemberships() {
  //     return this.$http.get('/api/memberships')
  //         .then(response => response.data);
  // }

  // getMembership(id) {
  //     return this.$http.get(`/api/memberships/${id}`)
  //         .then(response => response.data);
  // }

  async createMembership(payload) {
    await membershipsRepository.createMembership(payload);
    return { msg: 'ok' };
  }

  async updateMembership(id, payload) {
    await membershipsRepository.updateMembership(id, payload, true);
    return { msg: 'ok' };
  }

  async deleteMembership(id) {
    await membershipsRepository.deleteMembership(id);
    return { msg: 'ok' };
  }
}

module.exports = MembershipsService;
