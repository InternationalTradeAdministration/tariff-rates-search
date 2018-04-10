import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createHashHistory';
import useQueries from 'history/lib/useQueries';
import configureStore from './configureStore';
import App from './containers/App';

function renderToElement(elementId, scroll_coordinates) {
  const store = configureStore();
  const history = useQueries(createHistory)();

  require('es6-promise').polyfill();

  render(
    <Provider store={store} key="provider">
      <App history={history} scroll_coordinates={scroll_coordinates}/>
    </Provider>, document.getElementById(elementId));

  if (__DEVELOPMENT__ && module.hot) {
    const { AppContainer } = require('react-hot-loader');

    module.hot.accept('./containers/App', () => {
      const NextApp = require('./containers/App').default;

      render(
        <AppContainer>
          <Provider store={store} key="provider">
            <NextApp history={history} />
          </Provider>
        </AppContainer>, document.getElementById(elementId));
    });
  }
}

export default renderToElement;
window.Explorer = {
  render: renderToElement,
};
