const request = require("request-promise-native");

const wolf = async function(title) {

  // shrek,
  const hasName = (results)=> {
    try {
      return results.queryresult.assumptions.values.map((x) => x.name);
      // return results.queryresult.assumptions.values[0].name;
    } catch (err) {
      return false;
    }
  }

  // casino royale, bombay roti,
  const hasName_subcategory = (results) => {
    try {
      console.log("we are in subname")
      return results.queryresult.assumptions[0].values.map((x) => x.name);

      // return results.queryresult.assumptions[0].values[0].name;
    } catch (err) {
      return false;
    }
  }

  const hasTopic = (results)=> {
    try {
      console.log("we are in futureTopic");
      return [results.queryresult.futuretopic.topic];

      // return results.queryresult.futuretopic.topic;
    } catch (err) {
      return false;
    }
  }
  const hasDataTypes = (results)=> {
    try {
      console.log("we are in datatypes")
      return results.queryresult.map((x) => x.datatypes);
    } catch (err) {
      return false;
    }
  }

  const results = async function(resultsParse) {
    const name = hasName(resultsParse);
    const subName = hasName_subcategory(resultsParse);
    const topic = hasTopic(resultsParse);
    const dataType = hasDataTypes(resultsParse);
    if (name) {
      return name
    } else if (subName) {
      return subName;
    } else if (topic) {
      return topic;
    } else if (dataType) {
      return dataType;
    }
  };

  // const appID = 'KUUUJK-2WQHQHGYET';
  let URL = `http://api.wolframalpha.com/v2/query?appid=KUUUJK-2WQHQHGYET&input=${title}&output=json`;
  return request(URL).then((body) => {
    const resultsParse = JSON.parse(body);
    if (title.length === 0) {
      callback("Nothing to search, please retry", null);
    } else {
      return results(resultsParse);
    }
  });
};


module.exports = {wolf}




// results =>  parseCategories


// function parseCategories(qr) {
//   if (qr.futuretopic) {
//     return [qu.futuretopic.topic];
//   }

//   if (qr.assumptions.length) {
//     return parseAssumptionsArray(qr.assumptions);
//   }

//   if (assumptions.type) { // assumptions is an object
//     // map values to name
//   }

//   throw new Error("Couldn't parse query result: ", qr);

// }
