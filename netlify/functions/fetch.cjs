require("dotenv").config();
import fetch from 'node-fetch';

exports.handler = async (event, context) => {

  const params = await event.queryStringParameters;
  const {count} = params;
  const {API_KEY} = process.env;
  const corsProxy = 'https://corsproxy.io/?';

  const resp = await fetch(corsProxy + `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`);    
  const data = await resp.json();
    
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
