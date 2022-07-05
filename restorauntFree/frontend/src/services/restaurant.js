import http from "../http-common";

class RestaurantDataService {
  getAll(page = 0) {
    //restaurant-list  de (retrieveRestaurants) seklinde kullandik
    return http.get(`?page=${page}`);
  }
  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  createReview(data) {
    return http.post("/review", data);
  }

  updateReview(data) {
    return http.put("/review", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/review?id=${id}`, {
      data: { user_id: userId },
    });
  }

  getCuisines(id) {
    return http.get(`/cuisines`);
  }
}

export default new RestaurantDataService();
