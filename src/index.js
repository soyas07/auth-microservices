import app from './app.js';

const port = process.env.PORT;
const host = '0.0.0.0';
app.listen(port, host, async () => {
  try {
    /* eslint-disable no-console */
    console.log(`Listening: http://0.0.0.0:${port}`);
    /* eslint-enable no-console */
  } catch (error) {
    console.error(error);
  }
});
