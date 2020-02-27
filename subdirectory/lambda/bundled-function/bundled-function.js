const axios = require("axios")
const sanityClient = {};

exports.handler = function (event) {
  if (!process.env.SANITY_SCHEDULER_TOKEN) {
    console.log('Missing SANITY_SCHEDULER_TOKEN');
  }
  sanityClient.clientConfig.token = process.env.SANITY_SCHEDULER_TOKEN;

  if (!process.env.SCHEDULER_API_KEY) {
    console.log('Missing SCHEDULER_API_KEY');
  }

  const { apiKey } = event.queryStringParameters;
  if (!apiKey || apiKey !== process.env.SCHEDULER_API_KEY) {
    console.log('Invalid API key');
  }

  sanityClient.fetch('*[defined(scheduledPublishTime) && scheduledPublishTime < now() && _id match "drafts.*"]').then((result) => {
    publishDocuments(result);
  });
};