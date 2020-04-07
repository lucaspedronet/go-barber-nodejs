/* eslint-disable no-console */
import app from './app';

const port = process.env.APP_URL || 3301;
app.listen(port, () => {
  console.log(`Server node start in --> ${port}`);
});
