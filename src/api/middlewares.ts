import z from 'zod';
import {
  defineMiddlewares,
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
  validateAndTransformBody,
  validateAndTransformQuery,
  authenticate,
} from '@medusajs/framework/http';
import { PostAdminCreateBrand } from './admin/brands/validators';
import { createFindParams } from '@medusajs/medusa/api/utils/validators';
import { PostStoreCustomSchema } from './testquery/validators';
import { ConfigModule } from '@medusajs/framework';
import cors from 'cors';
import { parseCorsOrigins } from '@medusajs/framework/utils';

export const GetBrandsSchema = createFindParams();

// export default defineMiddlewares({
//   routes: [
//     {
//       matcher: '/testquery',
//       method: 'GET',
//       middlewares: [validateAndTransformQuery(PostStoreCustomSchema)],
//     },

//     // {
//     //   // string or regural expression
//     //   matcher: '/admin/brands',
//     //   method: 'POST',
//     //   middlewares: [
//     //     validateAndTransformBody(PostAdminCreateBrand), // FIXME: Problem with types
//     //   ],
//     // },
//     // {
//     //   matcher: '/admin/products',
//     //   method: 'POST',
//     //   // additionalDataValidator: {
//     //   //   brand_id: z.string().optional(), // FIXME: Problem with types
//     //   // },
//     //   additionalDataValidator: z.object({ brand_id: z.string() }),
//     // },
//     // {
//     //   matcher: '/admin/brands',
//     //   method: 'GET',
//     //   middlewares: [
//     //     validateAndTransformQuery(GetBrandsSchema, {
//     //       defaults: ['id', 'name', 'products.*'],
//     //       isList: true,
//     //     }),
//     //   ],
//     // },
//     // {
//     //   matcher: '/others*',
//     //   method: 'POST',
//     //   middlewares: [
//     //     (req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
//     //       console.log('Received a request!');

//     //       next();
//     //     },
//     //   ],
//     // },
//     // {
//     //   matcher: '/custom',
//     //   method: 'POST',
//     //   middlewares: [validateAndTransformBody(PostStoreCustomSchema)],
//     // },
//   ],
// });
const attachCors = (
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction
) => {
  const configModule: ConfigModule = req.scope.resolve('configModule');

  return cors({
    origin: parseCorsOrigins(configModule.projectConfig.http.storeCors),
    credentials: true,
  })(req, res, next);
};

export default defineMiddlewares({
  routes: [
    {
      matcher: '/hello-world',
      method: 'GET',
      middlewares: [authenticate('user', ['session', 'bearer', 'api-key'])],
    },
    {
      matcher: '/custom/customer*',
      middlewares: [authenticate('customer', ['session', 'bearer'])],
    },
    {
      matcher: '/custom',
      method: 'POST',
      middlewares: [validateAndTransformQuery(PostStoreCustomSchema, {})],
    },
    {
      matcher: '/custom*',
      // Without CORS middleware for custom routes it will always throw error
      middlewares: [attachCors],
    },
  ],
});
