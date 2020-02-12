async function analyzingEntities(text) {
// Imports the Google Cloud client library
const language = require('@google-cloud/language');
console.log("This is the data being passed through analyzeEntities Function: ",text)
// Creates a client
const client = new language.LanguageServiceClient();

/**
 * TODO(developer): Uncomment the following line to run this code.
 */
// const text = 'Your text to analyze, e.g. Hello, world!';

// Prepares a document, representing the provided text
const document = {
  content: text,
  type: 'PLAIN_TEXT',
};

// Detects entities in the document
const [result] = await client.analyzeEntities({document});

const entities = result.entities;

console.log('Entities:');
entities.forEach(entity => {
  console.log(entity.name);
  console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
  if (entity.metadata && entity.metadata.wikipedia_url) {
    console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
  }
});
 return entities;
}

module.exports = { analyzingEntities }
