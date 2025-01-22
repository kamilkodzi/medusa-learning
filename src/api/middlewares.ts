import z from 'zod';
import {
  defineMiddlewares,
  validateAndTransformBody,
  validateAndTransformQuery,
} from '@medusajs/framework/http';
import { PostAdminCreateBrand } from './admin/brands/validators';
import { createFindParams } from '@medusajs/medusa/api/utils/validators';

export const GetBrandsSchema = createFindParams();

export default defineMiddlewares({
  routes: [
    {
      // string or regural expression
      matcher: '/admin/brands',
      method: 'POST',
      middlewares: [
        validateAndTransformBody(PostAdminCreateBrand), // FIXME: Problem with types
      ],
    },
    {
      matcher: '/admin/products',
      method: 'POST',
      // additionalDataValidator: {
      //   brand_id: z.string().optional(), // FIXME: Problem with types
      // },
      additionalDataValidator: z.object({ brand_id: z.string() }),
    },
    {
      matcher: '/admin/brands',
      method: 'GET',
      middlewares: [
        validateAndTransformQuery(GetBrandsSchema, {
          defaults: ['id', 'name', 'products.*'],
          isList: true,
        }),
      ],
    },
  ],
});
