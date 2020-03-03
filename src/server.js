/* eslint-disable no-console */
import app from './app';

const port = 3000;
app.listen(port, () => {
  console.log(`Server node start in --> ${port}`);
});
