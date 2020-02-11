async function analyzeSentimentOfText(text) {
  // [START language_sentiment_text]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */
  // text = 'Shrek';

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the document
  const [result] = await client.analyzeSentiment({document});

  // const sentiment = result.documentSentiment;
  // console.log(`Document sentiment:`);
  // console.log(`  Score: ${sentiment.score}`);
  // console.log(`  Magnitude: ${sentiment.magnitude}`);

  const sentences = result.sentences;
  sentences.forEach(sentence => {
    console.log(`Sentence: ${sentence.text.content}`);
    console.log(`  Score: ${sentence.sentiment.score}`);
    console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
  });
  return "working"
  // [END language_sentiment_text]
}


async function classifyTextOfText(text) {
  // [START language_classify_text]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');
  console.log("data that is being passed through",text)
  // Creates a client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */
  // text = 'Shrek is a movie';

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Classifies text in the document
  const [classification] = await client.classifyText({document});
  console.log('Categories:');
  classification.categories.forEach(category => {
    console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
  });

  return "classifying text"
  // [END language_classify_text]
}

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
}

module.exports = { analyzeSentimentOfText, classifyTextOfText, analyzingEntities }
