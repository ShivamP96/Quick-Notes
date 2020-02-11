// Will contail most of the logic for fetching the data from each API endpoint

// http://api.wolframalpha.com/v2/query

// needs appid  = KUUUJK-2WQHQHGYET
// http://api.wolframalpha.com/v2/query?appid=DEMO


// pick specific pods to return using the id
// http://api.wolframalpha.com/v2/query?appid=DEMO&input=population%20france&includepodid=Result


// get it returned as json
// http://api.wolframalpha.com/v2/query?appid=DEMO&input=tides%20seattle&output=json

// we need to put spaces inbetween each part

// for every input we need so if someone puts in a space like " cheese pizza we need to run it through it"

const request = require('request');

const wolf = function(title) {
  // const appID = 'KUUUJK-2WQHQHGYET';
  // using template literals so we need to input the variables inside and output as JSON
  let URL = `http://api.wolframalpha.com/v2/query?appid=KUUUJK-2WQHQHGYET&input=${title}&output=json`;
  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const resultsParse = JSON.parse(body);
    if (ipAddress.length === 0) {
      callback("No IP address found, please retry", null);
    } else {
      // console.log()
      callback(null, ipAddress.ip);
    }
  });
}
let word = "tomato"
wolf(word);


const fetchMyIP = function(callback) {
  const appID = 'KUUUJK-2WQHQHGYET';
  // using template literals so we need to input the variables inside and output as JSON
  let URL = `http://api.wolframalpha.com/v2/query?appid=${appID}&input=tides%20seattle&output=json`;
  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ipAddress = JSON.parse(body);
    if (ipAddress.length === 0) {
      callback("No IP address found, please retry", null);
    } else {

      // console.log()
      callback(null, ipAddress.ip);
    }
  });
};


const fetchCoordsByIP = function(ipAddress, callback) {

  request(`https://ipvigilante.com/json/${ipAddress}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if(response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const { latitude, longitude} = JSON.parse(body).data;
    callback(null,{latitude, longitude});
  })

}




const fetchISSFlyOverTimes = function(coords, callback) {

  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};



const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if(error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      })
    })
  })
}

module.exports = {  nextISSTimesForMyLocation };


