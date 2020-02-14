const matchFinder = function (potentialMatch) {
  const CatKeys = {
    Movies: new Set(['Movie']),
    Books: new Set(["Book"]),
    Products: new Set(["Invention", "Unit","ConsumerProductsPTEClass" ]),
    Food: new Set (["RetailLocationClass", "RetailLocation", "ExpandedFood","Plant","Food"])
  }

  console.log("Potential Matches",potentialMatch)

  for (let element of potentialMatch) {
    for (const keys in CatKeys) {
      if(CatKeys[keys].has(element)) {
        console.log("Key: ",keys);
        return keys;
      }
    }
  }
}


module.exports = {matchFinder}
