import { Module } from '@medusajs/framework/utils';
import mongoConnectionLoader from './loaders/connection';
import MongoModuleService from './service';

export const MONGO_MODULE = 'mongo';

export default Module(MONGO_MODULE, {
  service: MongoModuleService,
  loaders: [mongoConnectionLoader],
});
