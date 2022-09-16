import { request } from "@strapi/helper-plugin";

const pageRequests = {
  getAllPages: async () => {
    return await request("/page/find", {
      method: "GET",
    });
  },

  getOnePage: async (id) => {
    return await request(`/page/find/${id}`, {
      method: "GET",
    });
  },

  addPage: async (data) => {
    return await request(`/page/create`, {
      method: "POST",
      body: { data: data },
    });
  },

  editPage: async (id, data) => {
    return await request(`/page/update/${id}`, {
      method: "PUT",
      body: { data: data },
    });
  },

  deletePage: async (id) => {
    return await request(`/page/delete/${id}`, {
      method: "DELETE",
    });
  },

}

export default pageRequests;
