import { Context, InferTypeOf, Logger } from '@medusajs/framework/types';
import {
  InjectManager,
  MedusaContext,
  MedusaService,
} from '@medusajs/framework/utils';
import MyCustom from './models/my-custom';
import { EntityManager, knex } from '@mikro-orm/knex';
import { ClientService } from './services';

// recommended to define type in another file
// type ModuleOptions = {
//   capitalize?: boolean;
// };
// type InjectedDependencies = {
//   logger: Logger;
// };

type InjectedDependencies = {
  clientService: ClientService;
};

// export default class HelloModuleService extends MedusaService({}) {
//   protected options_: ModuleOptions;
//   protected logger_: Logger;

//   constructor({ logger }: InjectedDependencies, options?: ModuleOptions) {
//     super(...arguments);
//     this.logger_ = logger;
//     this.options_ = options || {
//       capitalize: false,
//     };
//     this.logger_.info('What is inside hello module options: ' + this.options_);
//   }

//   // ...
// }

type MyCustom = InferTypeOf<typeof MyCustom>; // when type is needed we casn use it example:
// async doSomething(): Promise<MyCustom> {
//   // ...
// }

class HelloModuleService extends MedusaService({
  MyCustom,
}) {
  protected clientService_: ClientService;
  // CONSTRUCTOR, not mandatory
  // constructor() { // when implementing constructor - paste ...arguments
  //   super(...arguments)
  // }
  // TODO implement custom methods
  constructor({ clientService }: InjectedDependencies) {
    super(...arguments);
    this.clientService_ = clientService;
  }

  @InjectManager()
  async getCount(
    @MedusaContext() sharedContext?: Context<EntityManager>
  ): Promise<number> {
    return await sharedContext!.manager!.count('my_custom');
  }

  @InjectManager()
  async getCountSql(
    @MedusaContext() sharedContext?: Context<EntityManager>
  ): Promise<number> {
    const data = await sharedContext!.manager!.execute(
      'SELECT COUNT(*) as num FROM my_custom'
    );
    // const data = await sharedContext!.manager!.execute(
    //   knex('my_custom').select('SELECT COUNT(*) as num')
    // ); to be checked

    return parseInt(data[0].num);
  }
}

export default HelloModuleService;

// it can be used in workflows like example with blog:

// const createPostStep = createStep(
//   'create-post',
//   async ({ title }: CreatePostWorkflowInput, { container }) => {
//     const blogModuleService: BlogModuleService = container.resolve(BLOG_MODULE);

// thanks to extending MedusaService (it takes only one param - data model)
// I have access to:

// const myCustoms = await helloModuleService.listMyCustoms();

// // with filters
// const myCustoms = await helloModuleService.listMyCustoms({
//   id: ['123'],
// });

// //
// const [myCustoms, count] = await helloModuleService.listAndCountMyCustoms();

// // with filters
// const [myCustoms, count] = await helloModuleService.listAndCountMyCustoms({
//   id: ['123'],
// });

// const myCustom = await helloModuleService.retrieveMyCustom('123');

// const myCustom = await helloModuleService.createMyCustoms({
//   name: 'test',
// });

// // create multiple
// const myCustoms = await helloModuleService.createMyCustoms([
//   {
//     name: 'test',
//   },
//   {
//     name: 'test 2',
//   },
// ]);

// const myCustom = await helloModuleService.updateMyCustoms({
//   id: '123',
//   name: 'test',
// });

// // update multiple
// const myCustoms = await helloModuleService.updateMyCustoms([
//   {
//     id: '123',
//     name: 'test',
//   },
//   {
//     id: '321',
//     name: 'test 2',
//   },
// ]);

// // use filters
// const myCustoms = await helloModuleService.updateMyCustoms([
//   {
//     selector: {
//       id: ['123', '321'],
//     },
//     data: {
//       name: 'test',
//     },
//   },
// ]);

// await helloModuleService.deleteMyCustoms('123');

// // delete multiple
// await helloModuleService.deleteMyCustoms(['123', '321']);

// // use filters
// await helloModuleService.deleteMyCustoms({
//   selector: {
//     id: ['123', '321'],
//   },
// });

// await helloModuleService.softDeleteMyCustoms('123');

// // soft-delete multiple
// await helloModuleService.softDeleteMyCustoms(['123', '321']);

// // use filters
// await helloModuleService.softDeleteMyCustoms({
//   id: ['123', '321'],
// });

// //This method restores soft-deleted records using an array of IDs or an object of filters.
// await helloModuleService.restoreMyCustoms(['123', '321']);

// // use filters
// await helloModuleService.restoreMyCustoms({
//   id: ['123', '321'],
// });
