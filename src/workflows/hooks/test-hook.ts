import { deleteProductTagsWorkflow } from '@medusajs/medusa/core-flows';

deleteProductTagsWorkflow.hooks.productTagsDeleted(
  async ({ ids }, { container }) => {
    // TODO perform an action
  }
);
