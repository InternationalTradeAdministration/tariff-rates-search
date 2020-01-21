import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import App from './containers/App';

function renderToElement(elementId, scroll_coordinates) {
  const store = configureStore();
  const history = createBrowserHistory();

  render(
    <Provider store={store} key="provider">
      <App history={history} scroll_coordinates={scroll_coordinates}/>
    </Provider>, document.getElementById(elementId));
}

export default renderToElement;
window.Explorer = {
  render: renderToElement,
};
