"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Weather Top 2 Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id)
    };
    logger.info("about to render", stationStore.getAllStation());
    response.render("dashboard", viewData);
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newPlayList = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      title: request.body.title,
      songs: []
    };
    logger.debug("Creating a new Station", newPlayList);
    stationStore.addStation(newPlayList);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
 