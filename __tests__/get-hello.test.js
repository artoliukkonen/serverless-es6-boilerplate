import getHello from '../src/get-healthcheck';

test('Hello World', async () => {
  expect.assertions(1);
  const service = getHello();
  await expect(service).resolves.toMatchSnapshot();
});
