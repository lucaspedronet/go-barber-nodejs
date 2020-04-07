/* eslint-disable no-console */
import app from './app';

const port = process.env.PORT_BASE;
app.listen(port, () => {
  console.log(`Server node start in --> ${port}`);
});
