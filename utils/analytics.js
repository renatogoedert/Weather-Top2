"use strict";

const analytics = {
  getLatestReading(station) {
    let latestReading = station.readings[station.readings.length - 1];
    return latestReading;
  },
  
  codeToWeather(station) {
    let reading = this.getLatestReading(station);
    let code = reading.code;
    if (code == 100) {
      return "Clear";
    } else if (code == 200) {
      return "Partial clouds";
    } else if (code == 300) {
      return "Cloudy";
    } else if (code == 400) {
      return "Light Showers";
    } else if (code == 500) {
      return "Heavy Showers";
    } else if (code == 600) {
      return "Rain";
    } else if (code == 700) {
      return "Snow";
    } else {
      return "Thunder";
    }
  },

  ceToFa(station) {
    let reading = this.getLatestReading(station);
    let temperature = reading.code;
    return (temperature * 9) / 5 + 32;
  },

  windInBf(station) {
    let reading = this.getLatestReading(station);
    let windSpeed = reading.windSpeed;
    if (windSpeed == 1) return 0;
    if (windSpeed > 1 && windSpeed <= 5) return 1;
    if (windSpeed > 5 && windSpeed <= 11) return 2;
    if (windSpeed > 11 && windSpeed <= 19) return 3;
    if (windSpeed > 19 && windSpeed <= 28) return 4;
    if (windSpeed > 28 && windSpeed <= 38) return 5;
    if (windSpeed > 38 && windSpeed <= 49) return 6;
    if (windSpeed > 49 && windSpeed <= 61) return 7;
    if (windSpeed > 61 && windSpeed <= 74) return 8;
    if (windSpeed > 74 && windSpeed <= 88) return 9;
    if (windSpeed > 88 && windSpeed <= 102) return 10;
    if (windSpeed > 103 && windSpeed <= 117) return 11;
    else return 12;
  },

  windDirectionString(station) {
    let reading = this.getLatestReading(station);
    let windDirection = reading.windDirection;
    if (windDirection > 348.75 && windDirection <= 11.25) return "N";
    if (windDirection > 11.25 && windDirection <= 33.75) return "NNE";
    if (windDirection > 33.75 && windDirection <= 56.25) return "NE";
    if (windDirection > 56.25 && windDirection <= 78.75) return "ENE";
    if (windDirection > 78.75 && windDirection <= 101.25) return "E";
    if (windDirection > 101.25 && windDirection <= 123.75) return "ESE";
    if (windDirection > 123.75 && windDirection <= 146.25) return "SE";
    if (windDirection > 146.25 && windDirection <= 168.75) return "SSE";
    if (windDirection > 168.75 && windDirection <= 191.25) return "S";
    if (windDirection > 191.25 && windDirection <= 213.75) return "SSW";
    if (windDirection > 213.75 && windDirection <= 236.25) return "SW";
    if (windDirection > 236.25 && windDirection <= 259.75) return "WSW";
    if (windDirection > 259.75 && windDirection <= 281.25) return "W";
    if (windDirection > 281.25 && windDirection <= 303.25) return "WNW";
    if (windDirection > 303.25 && windDirection <= 326.25) return "NW";
    else return "NNW";
  },

  windChill(station) {
    let reading = this.getLatestReading(station);
    let temperature = reading.temperature;
    let windSpeed = reading.windSpeed;
    return (
      13.12 +
      0.6215 * temperature -
      11.37 * Math.pow(windSpeed, 0.16) +
      0.3965 * temperature * Math.pow(windSpeed, 0.16)
    ).toFixed(1);
  },
};

module.exports = analytics;
