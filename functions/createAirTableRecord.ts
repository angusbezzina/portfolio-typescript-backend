import type { APIGatewayEvent } from 'aws-lambda';
import Airtable from "airtable";

const AIRTABLE = {
  API_KEY: `${process.env.AIRTABLE_API_KEY}`,
  BASE: `${process.env.AIRTABLE_BASE}`,
  TABLE: `${process.env.AIRTABLE_TABLE}`,
};
const base = new Airtable({ apiKey: AIRTABLE.API_KEY }).base(AIRTABLE.BASE);

function parseBody(body: string | null) {
  if (!body) {
    return undefined;
  }

  try {
    const data = JSON.parse(body);
    return data;
  } catch (err) {
    // Oh well
  }
}

export async function createAirTableRecord(event: APIGatewayEvent) {
  const { body } = event;
  console.log('Got request', body);
  const incoming = parseBody(body);
  const { name, email, message, language } = incoming;
  const headers = {
    "access-control-allow-methods": "OPTIONS,POST",
    "access-control-allow-origin": "*",
    "content-type": "application/json",
  };

  return new Promise((resolve) => {
    base(AIRTABLE.TABLE).create(
      {
        Email: email,
        Message: message,
        Name: name,
        Language: language,
      },
      (err) => {
        if (err) {
          return resolve({
            statusCode: 400,
            body: JSON.stringify({ success: false }),
            headers: headers,
          });
        }
        resolve({
          statusCode: 201,
          body: JSON.stringify({ success: true }),
          headers: headers,
        });
      }
    );
  });
};
