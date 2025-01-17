import {
  ContainerRegistrationKeys,
  MedusaService,
} from '@medusajs/framework/utils';
import Post from './models/post';
import { logger } from '@medusajs/framework/logger';
import { Logger } from '@medusajs/framework/types';

// class BlogModuleService extends MedusaService({
//   Post,
// }) {
//   async myCustomFunction() {
//     // const logger = this.container.resolve(ContainerRegistrationKeys.LOGGER);
//     logger.info('Hello, worldasdasdasd!');
//     return 'Hello, world!';
//   }
// }

class BlogModuleService {
  async myCustomFunction() {
    // const logger = this.container.resolve(ContainerRegistrationKeys.LOGGER);
    logger.info('Hello, worldasdasdasd!');
    return 'Hello, world!';
  }
}

type InjectedDependencies = {
  logger: Logger;
};

export default class HelloModuleService {
  protected logger_: Logger;

  constructor({ logger }: InjectedDependencies) {
    this.logger_ = logger;

    this.logger_.info('[HelloModuleService]: Hello World!');
  }

  async myCustomFunction() {
    // const logger = this.container.resolve(ContainerRegistrationKeys.LOGGER);
    this.logger_.info('Hello, worldasdasdasd!');
    return 'Hello, world!';
  }
}
// ...

// export default BlogModuleService;
