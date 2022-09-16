'use strict';

module.exports = ({ strapi }) => ({
  async find(query){
    return await strapi.entityService.findMany("plugin::page.page", query)
  },

  async findOne(id){
    return await strapi.entityService.findOne("plugin::page.page", id)
  },

  async delete(id) {
    return await strapi.entityService.delete("plugin::page.page", id);
  },

  async create(data) {
    return await strapi.entityService.create("plugin::page.page", data);
  },

  async update(id, data) {
    return await strapi.entityService.update("plugin::page.page", id, data);
  },
});
