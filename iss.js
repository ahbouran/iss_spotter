const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data["ip"]);
  });
};  

const fetchCoordsByIP = function(ip, callback) {
  request('http://ip-api.com/json/', (error, response, body) => {
  //console.log(body)
  if (error) {
    return callback (error, null);
  }

  if (response.statusCode !== 200) {
    const message = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(message), null);
    return;
  }
  const data = JSON.parse(body)
  const coordinates = {};
  coordinates.latitude = data['lat']
  coordinates.longitude = data['lon']
  //console.log(coordinates)

  callback(null, coordinates);

  
  });
}


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=49.2666&lon=-123.1976`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const message = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(message), null);
      return;
    }

    const data = JSON.parse(body);
    const arrOfFlyOverTimes = data.response;
    callback(null, arrOfFlyOverTimes)
  })
}

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null)
    }

    fetchCoordsByIP(ip, (error, coordiantes) => {
      if(error) {
        return callback(error,null)
      }

      fetchISSFlyOverTimes(coordiantes, (error, arrOfFlyOverTimes) => {
        if (error) {
          return callback(error, null)
        }

        callback(null, arrOfFlyOverTimes)
      })
    })
  })
}


module.exports = { fetchMyIP, nextISSTimesForMyLocation };

