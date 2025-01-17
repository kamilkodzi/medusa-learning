import { MedusaService } from '@medusajs/framework/utils';
import MyCustom from './models/my-custom';
import { DAL } from '@medusajs/framework/types';
import {
  InjectManager,
  InjectTransactionManager,
  MedusaContext,
} from '@medusajs/framework/utils';
import { Context } from '@medusajs/framework/types';
import { EntityManager } from '@mikro-orm/knex';
import { IsolationLevel } from '@mikro-orm/core';

type InjectedDependencies = {
  baseRepository: DAL.RepositoryService;
};

// class HelloModuleService2_without_service_factory {
//   protected baseRepository_: DAL.RepositoryService;

//   constructor({ baseRepository }: InjectedDependencies) {
//     this.baseRepository_ = baseRepository;
//   }
// }

// class HelloModuleService extends MedusaService({
//   MyCustom,
// }) {
//   protected baseRepository_: DAL.RepositoryService;

//   constructor({ baseRepository }: InjectedDependencies) {
//     super(...arguments);
//     this.baseRepository_ = baseRepository;
//   }
// }

// export default HelloModuleService;
// ...

// Thanks to base repository i can change transaction settings, more in:
// https://docs.medusajs.com/learn/fundamentals/modules/db-operations#configure-transactions
class HelloModuleService {
  protected baseRepository_: DAL.RepositoryService;

  constructor({ baseRepository }: InjectedDependencies) {
    this.baseRepository_ = baseRepository;
  }

  @InjectTransactionManager()
  protected async update_(
    input: {
      id: string;
      name: string;
    },
    @MedusaContext() sharedContext?: Context<EntityManager>
  ): Promise<any> {
    return await this.baseRepository_.transaction(
      async (transactionManager) => {
        await transactionManager.nativeUpdate(
          'my_custom',
          {
            id: input.id,
          },
          {
            name: input.name,
          }
        );

        // retrieve again
        const updatedRecord = await transactionManager.execute(
          `SELECT * FROM my_custom WHERE id = '${input.id}'`
        );

        return updatedRecord;
      },
      {
        transaction: sharedContext!.transactionManager,
        isolationLevel: IsolationLevel.READ_COMMITTED,
      }
    );
  }

  @InjectManager()
  async update(
    input: {
      id: string;
      name: string;
    },
    @MedusaContext() sharedContext?: Context<EntityManager>
  ) {
    return await this.update_(input, sharedContext);
  }
}
