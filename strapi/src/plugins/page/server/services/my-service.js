'use strict';

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },
  
  async getById(id) {
    try {
      let page = await strapi.entityService.findOne("plugin::page.page", id)
      return page
    } catch (err) {
      throw err;
    }
  }
});
