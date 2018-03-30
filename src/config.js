import { assign } from './utils/lodash';

const config = assign({
  development: {
    api: {
      tariff_rates: {
        //host: 'https://api.govwizely.com/tariff_rates/search',
        //apiKey: 'Z48wSr3E3nNN4itDUvE4Clje',
        host: 'https://api.trade.gov/tariff_rates/search',
        apiKey: 'hQ4L7ylI9POH3QuqxOY_l2UC',
      },
    },
  },
  production: {
    api: {
      tariff_rates: {
        host: 'https://api.trade.gov/tariff_rates/search',
        apiKey: 'hQ4L7ylI9POH3QuqxOY_l2UC',
      },
    },
  },
});

export default config[process.env.NODE_ENV];
