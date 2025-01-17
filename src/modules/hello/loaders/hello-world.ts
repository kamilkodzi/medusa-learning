import { LoaderOptions, MedusaContainer } from '@medusajs/framework/types';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';

// export default async (container: MedusaContainer, options: LoaderOptions) => {
//   const logger = container.resolve('logger');
//   logger.info('[helloWorldLoader]: Hello World!');
// };

// export default async function helloWorldLoader(
//   container: MedusaContainer,
//   options: LoaderOptions
// ) {
//   const logger = container.resolve('logger');
//   logger.info('[helloWorldLoader]: Hello World!');
// }

// recommended to define type in another file
type ModuleOptions = {
  capitalize?: boolean;
};

export default async function helloWorldLoader({
  container,
  options,
}: LoaderOptions<ModuleOptions>) {
  // const logger = container.resolve('logger'); both way is valid
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.log(`[helloWorldLoader]: Hello, World!, ${options}`);
  // console.log(options);
  // console.log(container.inspect());
}
