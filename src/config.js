import { assign } from './utils/lodash';

const config = assign({
  development: {
    api: {
      tariff_rates: {
        host: 'https://api.trade.gov/gateway/v1/tariff_rates/search',
        access_token: 'b0045391-2ef8-3049-a215-f78b7716f045',
      },
    },
  },
  production: {
    api: {
      tariff_rates: {
        host: 'https://api.trade.gov/gateway/v1/tariff_rates/search',
        access_token: 'b0045391-2ef8-3049-a215-f78b7716f045',
      },
    },
  },
});

export default config[process.env.NODE_ENV];
