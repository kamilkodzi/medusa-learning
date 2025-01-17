import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';

import { createPostWorkflow } from '../../../workflows/create-post';

/**
 * @description This is the route for the create post workflow
 * @param req - The request object
 * @param res - The response object
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { result: post } = await createPostWorkflow(req.scope).run({
    input: {
      title: 'My Post',
    },
  });

  res.json({
    post,
  });
}
