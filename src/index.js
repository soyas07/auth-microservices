import app from './app.js';
import sequelize from './utils/connection.js';

const port = process.env.PORT || 5000;
const host = '0.0.0.0';
app.listen(port, host, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
