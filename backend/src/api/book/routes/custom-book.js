'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/books-filter/by-price-range',
      handler: 'book.byPriceRange',
      config: {
        auth: false,
      },
    },
  ],
};