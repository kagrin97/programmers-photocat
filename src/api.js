const API_ENDPOINT =
  "https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: async (keyword) => {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/cats/search?q=${keyword}`
      );
      if (response.ok) return await response.json();
    } catch (e) {
      console.error(e);
    }
  },

  fetchCatDetails: async (id) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
      if (response.ok) return await response.json();
    } catch (e) {
      console.error(e);
    }
  },

  fetchCat50: async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/api/cats/random50`);
      if (response.ok) return await response.json();
    } catch (e) {
      console.error(e);
    }
  },
};
