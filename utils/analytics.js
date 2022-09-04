"use strict";

const analytics = {
  getLatestReading(station) {
    let latestReading = station.readings[station.readings.lenght - 1]
    return "latestReading";
    
  },
  
};

module.exports = analytics;
