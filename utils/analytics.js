"use strict";

const analytics = {
  getLatestReading(station) {
    let latestReading = station.readings[station.readings.length - 1];
    return latestReading;
  },
  
  get2LatestReading(station) {
    let latestReading2 = station.readings[station.readings.length - 2];
    return latestReading2;
  },
  
  get3LatestReading(station) {
    let latestReading3 = station.readings[station.readings.length - 3];
    return latestReading3;
  },
  
  tempTrendUp(station){
    if (station.readings.length > 2) {
      let last = this.getLatestReading(station);
      let secLast =  this.get2LatestReading(station);
      let trdLast =  this.get3LatestReading(station)
      if (trdLast.temperature < secLast.temperature && secLast.temperature < last.temperature){return true}
    }
  },
  
  tempTrendDown(station){
    if (station.readings.length > 2) {
      let last = this.getLatestReading(station);
      let secLast =  this.get2LatestReading(station);
      let trdLast =  this.get3LatestReading(station)
      if (trdLast.temperature > secLast.temperature && secLast.temperature > last.temperature){return true}
    }
  },
  
    windTrendUp(station){
    if (station.readings.length > 2) {
      let last = this.getLatestReading(station);
      let secLast =  this.get2LatestReading(station);
      let trdLast =  this.get3LatestReading(station)
      if (trdLast.windSpeed < secLast.windSpeed && secLast.windSpeed < last.windSpeed){return true}
    }
  },
  
  windTrendDown(station){
    if (station.readings.length > 2) {
      let last = this.getLatestReading(station);
      let secLast =  this.get2LatestReading(station);
      let trdLast =  this.get3LatestReading(station)
      if (trdLast.windSpeed > secLast.windSpeed && secLast.windSpeed > last.windSpeed){return true}
    }
  },
  
  pressureTrendUp(station){
    if (station.readings.length > 2) {
      let last = this.getLatestReading(station);
      let secLast =  this.get2LatestReading(station);
      let trdLast =  this.get3LatestReading(station)
      if (trdLast.pressure < secLast.pressure && secLast.pressure < last.pressure){return true}
    }
  },
  
  pressureTrendDown(station){
    if (station.readings.length > 2) {
      let last = this.getLatestReading(station);
      let secLast =  this.get2LatestReading(station);
      let trdLast =  this.get3LatestReading(station)
      if (trdLast.pressure > secLast.pressure && secLast.pressure > last.pressure){return true}
    }
  },

  maxTemp(station) {
    let maxTemp = null;
    if (station.readings.length > 0) {
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].temperature > maxTemp) {
          maxTemp = station.readings[i].temperature;
        }
      }
      return maxTemp;
    }
  },

  minTemp(station) {
    let minTemp = null;
    if (station.readings.length > 0) {
      minTemp = station.readings[0].temperature;
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].temperature < minTemp) {
          minTemp = station.readings[i].temperature;
        }
      }
      return minTemp;
    }
  },

  maxWind(station) {
    let maxWind = null;
    if (station.readings.length > 0) {
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed > maxWind) {
          maxWind = station.readings[i].windSpeed;
        }
      }
      return maxWind;
    }
  },

  minWind(station) {
    let minWind = null;
    if (station.readings.length > 0) {
      minWind = station.readings[0].windSpeed;
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed < minWind) {
          minWind = station.readings[i].windSpeed;
        }
      }
      return minWind;
    }
  },

  maxPressure(station) {
    let maxPressure = null;
    if (station.readings.length > 0) {
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].pressure > maxPressure) {
          maxPressure = station.readings[i].pressure;
        }
      }
      return maxPressure;
    }
  },

  minPressure(station) {
    let minPressure = null;
    if (station.readings.length > 0) {
      minPressure = station.readings[0].pressure;
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].pressure < minPressure) {
          minPressure = station.readings[i].pressure;
        }
      }
      return minPressure;
    }
  },

  codeToWeather(station) {
    if (station.readings.length > 0) {
      let reading = this.getLatestReading(station);
      let code = reading.code;
      if (code >= 200 && code < 300) {
        return "Thunderstorm";
      } else if (code >= 300 && code < 400) {
        return "Drizzle";
      } else if (code >= 500 && code < 600) {
        return "Rain";
      } else if (code >= 600 && code < 700) {
        return "Snow";
      } else if ( code > 800) {
        return "Clouds";
      } else if (code == 800) {
        return "Clear sky";
      } else if (code == 701) {
        return "Mist";
      } else if (code == 711) {
        return "Smoke";
      } else if (code == 721) {
        return "Haze";
      } else if (code == 731) {
        return "Dust";
      } else if (code == 741) {
        return "Fog";
      } else if (code == 751) {
        return "Sand";
      } else if (code == 761) {
        return "Dust";
      } else if (code == 762) {
        return "Ash";
      } else if (code == 771) {
        return "Squall";
      } else if (code == 781) {
        return "Tornado";
      }
    }
  },

  ceToFa(station) {
    if (station.readings.length > 0) {
      let reading = this.getLatestReading(station);
      let temperature = reading.temperature;
      return ((temperature * 9) / 5 + 32).toFixed(1);
    }
  },

  windInBf(station) {
    if (station.readings.length > 0) {
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
    }
  },

  windDirectionString(station) {
    if (station.readings.length > 0) {
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
    }
  },

  windChill(station) {
    if (station.readings.length > 0) {
      let reading = this.getLatestReading(station);
      let temperature = reading.temperature;
      let windSpeed = reading.windSpeed;
      return (
        13.12 +
        0.6215 * temperature -
        11.37 * Math.pow(windSpeed, 0.16) +
        0.3965 * temperature * Math.pow(windSpeed, 0.16)
      ).toFixed(1);
    }
  },
};

module.exports = analytics;
