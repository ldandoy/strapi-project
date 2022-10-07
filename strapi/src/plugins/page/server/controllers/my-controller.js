'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('page')
      .service('myService')
      .getWelcomeMessage();
  },

  async getById (ctx) {
    ctx.body = await strapi
      .plugin('page')
      .service('myService')
      .getById(ctx.params.id);
  }
};
