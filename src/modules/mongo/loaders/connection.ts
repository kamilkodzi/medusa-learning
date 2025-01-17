import { LoaderOptions } from '@medusajs/framework/types';
import { asValue } from 'awilix';
import { MongoClient } from 'mongodb';

type ModuleOptions = {
  connection_url?: string;
  db_name?: string;
};

export default async function mongoConnectionLoader({
  container,
  options,
}: LoaderOptions<ModuleOptions>) {
  if (!options!.connection_url) {
    throw new Error(`[MONGO MDOULE]: connection_url option is required.`);
  }

  if (!options!.db_name) {
    throw new Error(`[MONGO MDOULE]: db_name option is required.`);
  }
  const logger = container.resolve('logger');

  try {
    const clientDb = (
      await new MongoClient(options!.connection_url).connect()
    ).db(options!.db_name);

    logger.info('Connected to MongoDB');

    container.register('mongoClient', asValue(clientDb));
  } catch (e) {
    logger.error(
      `[MONGO MDOULE]: An error occurred while connecting to MongoDB: ${e}`
    );
  }
}
