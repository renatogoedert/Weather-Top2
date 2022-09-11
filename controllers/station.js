"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require("uuid");
const analytics = require("../utils/analytics");
const axios = require("axios");

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
      tempTrend: request.body.tempTrend,
      trendLabels: request.body.trendLabels,
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

  async addreport(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    logger.info("rendering new report");
    let report = {
      id: uuid.v1(),
      date: new Date().toUTCString(),
    };
    const lat = station.latitude;
    const lng = station.longitude;
    const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&appid=2854994a442c1ea2338e5d0490545c09`;
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      report.code = reading.weather[0].id;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;

      report.tempTrend = [];
      report.trendLabels = [];
      const trends = result.data.daily;
      for (let i = 0; i < trends.length; i++) {
        report.tempTrend.push(trends[i].temp.day);
        const date = new Date((trends[i].dt * 1000) + 2628800000);
        report.trendLabels.push(
          `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        );
      }
      logger.debug("New Report = ", report);
      stationStore.addReading(stationId, report);
      response.redirect("/station/" + stationId);
    }
  },
};

module.exports = station;
