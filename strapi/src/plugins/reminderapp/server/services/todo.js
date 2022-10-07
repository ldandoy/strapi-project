'use strict'

module.exports = ({ strapi }) => ({
    async find(query) {
        return await strapi.entityService.findMany("plugin::reminderapp.todo", query)
    },
    async delete(id) {
        return await strapi.entityService.delete("plugin::reminderapp.todo", id)
    },
    async create(data) {
        return await strapi.entityService.create("plugin::reminderapp.todo", data)
    },
    async update(id, data) {
        return await strapi.entityService.update("plugin::reminderapp.todo", id, data)
    },
    async toggle(id) {
        const result = await strapi.entityService.findOne("plugin::reminderapp.todo", id)
        return await strapi.entityService.update("plugin::reminderapp.todo", id, {
            data: {isdatepassed: !result.isdatepassed}
        })
    },
})