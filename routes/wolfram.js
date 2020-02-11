const request = require("request-promise-native");

const wolf = async function(title) {

  const results = async function(resultsParse) {
    const objectArray = resultsParse.queryresult.assumptions.values.map((x) => x.name );
    // if !name then check data type
    // if !name then & !data type then futuretopic: topic "Food"


    return objectArray;
  };
  // const appID = 'KUUUJK-2WQHQHGYET';

  let URL = `http://api.wolframalpha.com/v2/query?appid=KUUUJK-2WQHQHGYET&input=${title}&output=json`;
  return request(URL).then((body) => {
    const resultsParse = JSON.parse(body);
    if (title.length === 0) {
      callback("No serach paramater, please retry", null);
    } else {

      return results(resultsParse);

    }
  });
};


module.exports = {wolf}
