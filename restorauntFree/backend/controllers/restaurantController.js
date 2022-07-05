const RestaurantsDAO = require("../dataAccesObject/restaurantsDAO");

const apiGetRestaurants = async (req, res, next) => {
  const restaurantsPerPage = req.query.restaurantsPerPage
    ? parseInt(req.query.restaurantsPerPage, 10)
    : 20;
  const page = req.query.page ? parseInt(req.query.page, 10) : 0;

  let filters = {};
  if (req.query.cuisine) {
    filters.cuisine = req.query.cuisine;
  } else if (req.query.zipcode) {
    filters.zipcode = req.query.zipcode;
  } else if (req.query.name) {
    filters.name = req.query.name;
  }

  const { restaurantsList, totalNumRestaurants } =
    await RestaurantsDAO.getRestaurants({
      filters,
      page,
      restaurantsPerPage,
    });

  let response = {
    restaurants: restaurantsList,
    page: page,
    filters: filters,
    entries_per_page: restaurantsPerPage,
    total_results: totalNumRestaurants,
  };
  res.json(response);
};
const apiGetRestaurantById = async (req, res, next) => {
  //when we get a spesific restaurant id ,we want to get review which we wrote before
  //That is why first we get list of restaurants on postman .Then take _id from one of restaurant and send review to that restaurant
  try {
    let id = req.params.id || {};
    let restaurant = await RestaurantsDAO.getRestaurantByID(id);
    if (!restaurant) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(restaurant);
  } catch (e) {
    console.log(`api, ${e}`);
    res.status(500).json({ error: e });
  }
};

const apiGetRestaurantCuisines = async (req, res, next) => {
  /*
  http://localhost:5000/api/v1/restaurants/cuisines

  */
  try {
    let cuisines = await RestaurantsDAO.getCuisines();
    res.json(cuisines);
  } catch (e) {
    console.log(`api, ${e}`);
    res.status(500).json({ error: e });
  }
};

module.exports = {
  apiGetRestaurants,
  apiGetRestaurantCuisines,
  apiGetRestaurantById,
};
