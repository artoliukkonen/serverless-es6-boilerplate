export default async (event) => {
  console.log('Event', event);
  return {
    service: process.env.SERVERLESS_SERVICE,
    stage: process.env.SERVERLESS_STAGE,
    version: process.env.SERVERLESS_VERSION,
  };
};
