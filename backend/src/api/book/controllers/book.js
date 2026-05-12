'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::book.book', ({ strapi }) => ({
  async byPriceRange(ctx) {
    const { min, max } = ctx.query;

    if (!min || !max) {
      return ctx.badRequest('You must provide min and max price');
    }

    const books = await strapi.documents('api::book.book').findMany({
      filters: {
        price: {
          $gte: parseFloat(min),
          $lte: parseFloat(max),
        },
      },
      sort: { price: 'asc' },
      populate: ['genre'],
    });

    return { data: books };
  },
}));