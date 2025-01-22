import HelloModule from '../modules/hello';
import ProductModule from '@medusajs/medusa/product';
import { defineLink } from '@medusajs/framework/utils';

export default defineLink(
  ProductModule.linkable.product,
  HelloModule.linkable.myCustom,
  {
    database: {
      extraColumns: {
        metadata: {
          type: 'json',
        },
      },
    },
  }
);
