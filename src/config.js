import { assign } from './utils/lodash';

const config = assign({
  development: {
    api: {
      tariff_rates: {
        host: 'https://api.trade.gov/gateway/v1/tariff_rates/search',
        access_token: 'access_token',
      },
    },
  },
  production: {
    api: {
      tariff_rates: {
        host: 'https://api.trade.gov/gateway/v1/tariff_rates/search',
        access_token: 'access_token',
      },
    },
  },
});

export default config[process.env.NODE_ENV];
