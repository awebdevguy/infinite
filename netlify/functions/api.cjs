
// require("dotenv").config();
// import process from 'dotenv';
// require("dotenv").config();
import 'dotenv/config';
import fetch from 'node-fetch';

const {API_KEY} = process.env;
console.log("process.env: " + process.env);


exports.handler = async (event, context) => {

  const params = await event.queryStringParameters;
  const {count} = params;
  console.log("params: " + params);

  // const {API_KEY} = process.env;
  const corsProxy = 'https://corsproxy.io/?';

  const resp = await fetch(corsProxy + `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`);
  console.log("resp: " + resp);  

  const data = await resp.json();
  console.log("data: " + data);
    
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
