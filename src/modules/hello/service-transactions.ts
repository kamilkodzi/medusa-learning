import {
  InjectManager,
  InjectTransactionManager,
  MedusaContext,
} from '@medusajs/framework/utils';
import { Context } from '@medusajs/framework/types';
import { EntityManager } from '@mikro-orm/knex';

class HelloModuleService {
  // ...
  @InjectTransactionManager()
  protected async update_(
    input: {
      id: string;
      name: string;
    },
    @MedusaContext() sharedContext?: Context<EntityManager>
  ): Promise<any> {
    const transactionManager = sharedContext!.transactionManager;
    await transactionManager!.nativeUpdate(
      'my_custom',
      {
        id: input.id,
      },
      {
        name: input.name,
      }
    );

    // retrieve again
    const updatedRecord = await transactionManager!.execute(
      `SELECT * FROM my_custom WHERE id = '${input.id}'`
    );

    return updatedRecord;
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

// other imports...

class HelloModuleService2 {
  // ...
  @InjectManager()
  protected async anotherMethod(
    @MedusaContext() sharedContext?: Context<EntityManager>
  ) {
    // ...
  }

  @InjectTransactionManager()
  protected async update_(
    input: {
      id: string;
      name: string;
    },
    @MedusaContext() sharedContext?: Context<EntityManager>
  ): Promise<any> {
    this.anotherMethod(sharedContext);
  }
}
