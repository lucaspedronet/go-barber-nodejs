/* eslint-disable no-console */
import app from './app';

const port = 3001;
app.listen(port, () => {
  console.log(`Server node start in --> ${port}`);
});
