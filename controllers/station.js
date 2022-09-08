"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require("uuid");
const analytics = require("../utils/analytics");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);
    const station = stationStore.getStation(stationId);
    const viewData = {
      title: "Station",
      station: station,
      analytics: {
        codeToWeather: analytics.codeToWeather(station),
        ceToFa: analytics.ceToFa(station),
        maxTemp: analytics.maxTemp(station),
        minTemp: analytics.minTemp(station),
        windInBf: analytics.windInBf(station),
        maxWind: analytics.maxWind(station),
        minWind: analytics.minWind(station),
        windDirectionString: analytics.windDirectionString(station),
        windChill: analytics.windChill(station),
        maxPressure: analytics.maxPressure(station),
        minPressure: analytics.minPressure(station),
        tempTrendUp: analytics.tempTrendUp(station),
        tempTrendDown: analytics.tempTrendDown(station),
        windTrendUp: analytics.windTrendUp(station),
        windTrendDown: analytics.windTrendDown(station),
        pressureTrendUp: analytics.pressureTrendUp(station),
        pressureTrendDown: analytics.pressureTrendDown(station),
      },
    };
    response.render("station", viewData);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      pressure: request.body.pressure,
      windDirection: request.body.windDirection,
      date: new Date().toUTCString(),
    };
    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },
};

module.exports = station;
