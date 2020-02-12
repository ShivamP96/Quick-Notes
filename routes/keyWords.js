const matchFinder = function (potentialMatch) {
  const CatKeys = {
    movie: new Set(['Movie']),
    book: new Set(["Book"]),
    products: new Set(["Invention", "Unit","ConsumerProductsPTEClass","ExpandedFood", "Plant"]),
    restaurants: new Set (["RetailLocationClass", "RetailLocation" ])
  }

  for (const keys in CatKeys) {
  if(CatKeys[keys].has(potentialMatch)) {
    console.log(keys);
    console.log(potentialMatch)
    return keys;
    }
  }
}

// //4. insert into db but link*** to that category id, input = text

module.exports = {matchFinder}
