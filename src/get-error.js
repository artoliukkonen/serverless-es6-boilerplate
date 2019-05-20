export default async (event) => {
  console.log('Event', event);
  throw new Error('[403] Example error message returning status 403');
};
