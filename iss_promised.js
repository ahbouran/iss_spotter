const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org/?format=json')
};

const fetchCoordsByIP = function(body) {
  const data = JSON.parse(body)
  const coordinates = {};
  coordinates.latitude = data['lat']
  coordinates.longitude = data['lon']
  return request('http://ip-api.com/json/')
};

const fetchISSFlyOverTimes = function(body) {
  const data = JSON.parse(body);
  const arrOfFlyOverTimes = data.response;
  const url = `https://iss-pass.herokuapp.com/json/?lat=49.2666&lon=-123.1976`
  return request(url)
}

const nextISSTimesForMyLocation = function(body) {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((arrOfFlyOverTimes) => {
    const { response } = JSON.parse(arrOfFlyOverTimes);
    return response
  }) 
}

module.exports = { nextISSTimesForMyLocation };
