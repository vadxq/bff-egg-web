import React from 'react';
import ReactDom from 'react-dom';

import { getRoutes } from './routes';
import './index.less';

const App = () => (
  <div className="wrap wrap-test">{getRoutes()}</div>
);

ReactDom.render(<App />, document.querySelector('#root'));