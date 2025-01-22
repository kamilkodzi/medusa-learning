import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data: myCustoms } = await query.graph({
    entity: 'my_custom',
    ...req.queryConfig,
  });

  res.json({ my_customs: myCustoms });
};
