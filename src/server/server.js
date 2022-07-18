import express from 'express';
import * as ReactDOM from 'react-dom/server';
import { Main } from '../shared/Main';
import { indexTemplate } from './indexTemplate';

const app = express();

app.use('/static', express.static('./dist/client'));

app.get('/', (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(Main())));
});

app.post('/tickets-ok', (req, res) => {
  console.log(req.body);
  res.json({ result: 'Everything is ok!' });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
