import { request } from "@strapi/helper-plugin";

const todoRequests = {
  getAllTodos: async () => {
    return await request("/reminderapp/find", {
      method: "GET",
    });
  },

  addTodo: async (data) => {
    return await request(`/reminderapp/create`, {
      method: "POST",

      body: { data: data },
    });
  },

  toggleTodo: async (id) => {
    return await request(`/reminderapp/toggle/${id}`, {
      method: "PUT",
    });
  },

  editTodo: async (id, data) => {
    return await request(`/reminderapp/update/${id}`, {
      method: "PUT",

      body: { data: data },
    });
  },

  deleteTodo: async (id) => {
    return await request(`/reminderapp/delete/${id}`, {
      method: "DELETE",
    });
  },
};

export default todoRequests;