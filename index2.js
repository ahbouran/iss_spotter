const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((arrOfFlyOverTimes) => {
    console.log(arrOfFlyOverTimes)
  })
  .catch((error) => {
    console.log("It didn't workL: ", error.message)
  })

   