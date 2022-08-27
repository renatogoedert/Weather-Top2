"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Station Dashboard",
      stations: stationStore.getAllStation()
    };
    logger.info("about to render", stationStore.getAllStation());
    response.render("dashboard", viewData);
  }
};

module.exports = dashboard;
