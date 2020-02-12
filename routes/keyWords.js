const matchFinder = function (potentialMatch) {
  const CatKeys = {
    Movies: new Set(['Movie']),
    Books: new Set(["Book"]),
    Products: new Set(["Invention", "Unit","ConsumerProductsPTEClass","ExpandedFood", "Plant"]),
    restaurants: new Set (["RetailLocationClass", "RetailLocation" ])
  }

  for (const keys in CatKeys) {
  if(CatKeys[keys].has(potentialMatch)) {
    // console.log(keys);node
    // console.log(potentialMatch)
    return keys;
    }
  }
}
  // console.log(matchFinder(Movie))

// //4. insert into db but link*** to that category id, input = text

module.exports = {matchFinder}
