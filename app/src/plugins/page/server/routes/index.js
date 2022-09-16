module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
      auth: false,
    },
  },

  {
    method: 'GET',
    path: '/find',
    handler: 'page.find',
    config: {
      policies: [],
    },
  },

  {
    method: 'GET',
    path: '/find/:id',
    handler: 'page.findOne',
    config: {
      policies: [],
      auth: false,
    },
  },

  {
    method: "POST",
    path: "/create",
    handler: "page.create",
    config: {
      policies: [],
    },
  },

  {
    method: "DELETE",
    path: "/delete/:id",
    handler: "page.delete",
    config: {
      policies: [],
    },
  },

  {
    method: "PUT",
    path: "/update/:id",
    handler: "page.update",
    config: {
      policies: [],
    },
  },

  {
    method: 'GET',
    path: '/:id',
    handler: 'myController.getById',
    config: {
      policies: [],
      auth: false,
    },
  }

];
