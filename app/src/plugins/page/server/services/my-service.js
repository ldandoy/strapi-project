'use strict';

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },
  
  async getById(id) {
    try {
      let page = await strapi.entityService.findOne("plugin::page.page", id)
      let contentHTML = ""

      const pageContentObject = JSON.parse(page.content)

      // console.log(pageContentObject.blocks);

      pageContentObject.blocks.forEach(row => {
        if (row.label == 'row') {

          if (row.direction == 'row') {
            contentHTML += `<div class='row flex-row ${row.classe}'>`
          } else {
            contentHTML += `<div class='row flex-col ${row.classe}'>`
          }

          row.cells.forEach(cell => {
            if (typeof cell.content !== 'undefined') {
              contentHTML += '<div class="col ' + ( (typeof cell.classe !== 'undefined') ? cell.classe : "" ) + '">'
              contentHTML += `${cell.content}`
              contentHTML += `</div>`
            }
          })

          contentHTML += `</div>`
        }
      });

      page.htmlContent = contentHTML

      return page
    } catch (err) {
      ctx.throw(500, err);
    }
  }
});
