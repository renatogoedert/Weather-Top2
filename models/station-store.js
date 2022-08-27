"use strict";

const _ = require("lodash");

const stationStore = {
  stationCollection: require("./station-store.json").stationCollection,

  getAllStation() {
    return this.stationCollection;
  },

  getStation(id) {
    return _.find(this.stationCollection, { id: id });
  },

  addStation(station) {
    this.stationCollection.push(station);
  },

  removeStation(id) {
    const station = this.getStation(id);
    _.remove(this.stationCollection, { id: id });
  },

  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
  },

  removeReading(id, readingId) {
    const station = this.getStation(id);
    _.remove(station.readings, { id: readingId });
  },
};

module.exports = stationStore;
