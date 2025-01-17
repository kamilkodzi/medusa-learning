import { z } from 'zod';
import {
  defineMiddlewares,
  validateAndTransformBody,
} from '@medusajs/framework/http';
import { PostAdminCreateBrand } from './admin/brands/validators';

export default defineMiddlewares({
  routes: [
    {
      // string or regural expression
      matcher: '/admin/brands',
      method: 'POST',
      middlewares: [validateAndTransformBody(PostAdminCreateBrand)], // FIXME: Problem with types
    },
    {
      matcher: '/admin/products',
      method: 'POST',
      additionalDataValidator: {
        brand_id: z.string().optional(), // FIXME: Problem with types
      },
    },
  ],
});
