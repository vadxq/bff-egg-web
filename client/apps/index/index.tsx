import React from 'react';
import ReactDom from 'react-dom';

import { getRoutes } from './routes';
import './index.less';

const App = () => (
  <div>{getRoutes()}</div>
);

ReactDom.render(<App />, document.querySelector('#root'));