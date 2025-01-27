import {
  createStep,
  createHook,
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { createBrandStep } from '../create-brand';

export const myWorkflow = createWorkflow('my-workflow', function (input) {
  const product = createBrandStep(input);
  const brandCreatedHook = createHook('productCreated', {
    productId: product.id,
  });

  return new WorkflowResponse(product, {
    hooks: [brandCreatedHook],
  });
});
