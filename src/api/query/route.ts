import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';
import productCustomLink from '../../links/hello-product';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER);

  const { data: myCustoms } = await query.graph({
    entity: 'my_custom',
    fields: ['id', 'name', 'product.*'], // "products.*", If the linked data model has isList enabled in the link definition, pass in fields the data model's plural name suffixed with .*
  });

  // importing ling when you want to use pagination instead jus raw pull data that is related with ling
  const { data: productCustoms } = await query.graph({
    entity: productCustomLink.entryPoint, // every link created has its own entryPoint
    fields: ['*', 'product.*', 'my_custom.*'],
    pagination: {
      order: {
        name: 'DESC',
      },
      take: 1,
      skip: 0,
    },
    filters: {
      id: ['mc_01HWSVWR4D2XVPQ06DQ8X9K7AX', 'mc_01HWSVWK3KYHKQEE6QGS2JC3FX'],
    },
  });

  logger.info('Greeting from my_customs');
  logger.log(productCustoms);

  res.json({ my_customs: myCustoms });
};
