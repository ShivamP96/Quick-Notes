const request = require("request-promise-native");

const wolf = async function(title) {

  const hasName = (results)=> {
    try {
      return results.queryresult.assumptions.values[0].name;
    } catch (err) {
      return false;
    }
  }

  const hasName_subcategory = (results) => {
    try {
      return results.queryresult.assumptions[0].values[0].name;
    } catch (err) {
      return false;
    }
  }

  const hasTopic = (results)=> {
    try {
      return results.queryresult.futuretopic.topic;
    } catch (err) {
      return false;
    }
  }
  const hasDataTypes = (results)=> {
    try {
      return results.queryresult.dataTypes;
    } catch (err) {
      return false;
    }
  }

  const results = async function(resultsParse) {
    const name = hasName(resultsParse);
    const subName = hasName_subcategory(resultsParse)
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
