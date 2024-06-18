const express = require("express");
const favoriteRoute = express.Router();
// const favoriteController = require("../../controller/User/favorite.controller");
const {
  addFavorite,
  getFavorites,
  updateFavorite,
  getAllFavorites,
  deleteFavorite,
} = require("../../controller/user/favorite.controller");
const verifyToken = require("../../helper/userToken");

favoriteRoute.post("/add", verifyToken, addFavorite);

favoriteRoute.get("/get", verifyToken, getFavorites);

favoriteRoute.get("/favorites/all", getAllFavorites);

favoriteRoute.put("/favorites/update", updateFavorite);

favoriteRoute.delete("/delete/:id",deleteFavorite)

module.exports = favoriteRoute;
