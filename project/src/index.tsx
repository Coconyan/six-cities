import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';

const Setting = {
  CARDS_COUNT: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      cardsCount={Setting.CARDS_COUNT}
      offers={offers}
    />
  </React.StrictMode>,
  document.getElementById('root'));
