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
  },
  
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },
  
};

module.exports = dashboard;
