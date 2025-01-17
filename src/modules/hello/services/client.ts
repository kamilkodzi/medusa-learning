import { ConfigModule } from '@medusajs/framework/types';
import { HELLO_MODULE } from '..';

export type InjectedDependencies = {
  configModule: ConfigModule;
};

export class ClientService {
  protected options: Record<string, any>;

  constructor({ configModule }: InjectedDependencies) {
    const moduleDef = configModule.modules?.[HELLO_MODULE];

    if (moduleDef && typeof moduleDef !== 'boolean') {
      this.options = moduleDef.options ?? {};
    }

    // NOTE: Or better to throw error ?
  }

  async getMessage(): Promise<string> {
    return 'Hello, World!';
  }
}

// export class ClientService {
//       async getMessage(): Promise<string> {
//         return 'Hello, World!';
//       }
// }
