import getHello from '../get-hello';

test('Hello World', () => {
  const service = getHello();
  expect(service).toMatchSnapshot();
});
