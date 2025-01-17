// import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk';

import { createWorkflow } from '@medusajs/framework/workflows-sdk';

// const retrieveBrandsStep = createStep(
//   'retrieve-brands',
//   async (_, { container }) => {
//     const brandModuleService = container.resolve('brandModuleService');

//     const brands = await brandModuleService.listBrands();

//     return new StepResponse(brands);
//   }
// );

// const createBrandsInCmsStep = createStep(
//   'create-brands-in-cms',
//   async ({ brands }, { container }) => {
//     const cmsModuleService = container.resolve('cmsModuleService');

//     const cmsBrands = await cmsModuleService.createBrands(brands);

//     return new StepResponse(cmsBrands, cmsBrands);
//   },
//   async (brands, { container }) => {
//     const cmsModuleService = container.resolve('cmsModuleService');

//     await cmsModuleService.deleteBrands(brands.map((brand) => brand.id));
//   }
// );

// export const syncBrandsWorkflow = createWorkflow(
//   "sync-brands",
//   () => {
//     const brands = retrieveBrandsStep()

//     createBrandsInCmsStep({ brands })
//   }
// )
