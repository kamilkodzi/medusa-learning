import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk';

export const countProductsStep = createStep(
  'count-products',
  async ({}, { container }) => {
    const productModuleService = container.resolve('product');

    const [, count] = await productModuleService.listAndCountProducts();

    return new StepResponse(count);
  }
);
