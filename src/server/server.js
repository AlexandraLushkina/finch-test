import express from 'express';
import * as ReactDOM from 'react-dom/server';
import MainComponent from '../shared/Main';
import indexTemplate from './indexTemplate';

const app = express();

app.use('/static', express.static('./dist/client'));

app.get('/', (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(MainComponent())));
});

app.post('/tickets-ok', (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.body);
  res.json({ result: 'Everything is ok!' });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on http://localhost:3000');
});
