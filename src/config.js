import { assign } from './utils/lodash';

const config = assign({
  development: {
    api: {
      tariff_rates: {
        host: 'CHANGEME',
        subscription_key: 'CHANGEME'
      },
    },
  },
  production: {
    api: {
      tariff_rates: {
        host: 'CHANGEME',
        subscription_key: 'CHANGEME'
      },
    },
  },
});

export default config[process.env.NODE_ENV];
