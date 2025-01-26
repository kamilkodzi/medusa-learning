import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const a = req.validatedQuery.a as number;
  const b = req.validatedQuery.b as number;

  res.json({
    sum: a + b,
  });
};
