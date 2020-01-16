export default async (event) => {
  console.log('Event', event);

  return new Promise((resolve) => {
    setTimeout(() => resolve({ message: 'Your promise resolved!' }), 500);
  });
};
