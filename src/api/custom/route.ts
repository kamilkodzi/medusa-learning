import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';
import { PostStoreCustomSchema } from './validators';
import { z } from 'zod';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data: myCustoms } = await query.graph({
    entity: 'my_custom',
    ...req.queryConfig,
  });

  res.json({ my_customs: myCustoms });
};

type PostStoreCustomSchemaType = z.infer<typeof PostStoreCustomSchema>;

export const POST = async (
  req: MedusaRequest<PostStoreCustomSchemaType>,
  res: MedusaResponse
) => {
  res.json({
    sum: req.validatedBody.a + req.validatedBody.b,
  });
};
