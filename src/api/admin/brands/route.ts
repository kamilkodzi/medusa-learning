import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { createBrandWorkflow } from '../../../workflows/create-brand';
import { PostAdminCreateBrand } from './validators';
import { z } from 'zod';

type PostAdminCreateBrandType = z.infer<typeof PostAdminCreateBrand>;

export const POST = async (
  req: MedusaRequest<PostAdminCreateBrandType>,
  res: MedusaResponse
) => {
  const { result } = await createBrandWorkflow(req.scope).run({
    input: req.validatedBody,
  });

  res.json({ brand: result });
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve('query');

  const {
    data: brands,
    metadata: { count, take, skip }, // FIXME: Problem with types
  } = await query.graph({
    entity: 'brand',
    // fields: ['*', 'products.*'],
    ...req.queryConfig,
  });
  res.json({
    brands,
    count,
    limit: take,
    offset: skip,
  });
  // res.json({ brands });
};
