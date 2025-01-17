// other imports...
import { Module } from '@medusajs/framework/utils';
import helloWorldLoader from './loaders/hello-world';
import HelloModuleService from './service';

export const HELLO_MODULE = 'hello';

class HelloService {
  // Basic service implementation
}

export default Module(HELLO_MODULE, {
  service: HelloModuleService,
  loaders: [helloWorldLoader],
});
